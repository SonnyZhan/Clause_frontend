# Production Configuration Guide

This guide covers production-specific configurations for your Next.js + FastAPI application deployed on Vultr.

## Backend CORS Configuration

### Current Setup (Development)

The backend currently allows all origins (`allow_origins=["*"]`), which is fine for development but should be restricted in production.

### Production Setup

1. **Update `clause_backend/app/api_v2.py`**:

   Replace the CORS middleware configuration:

   ```python
   # Development (current)
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

   With production configuration:

   ```python
   # Production
   import os

   # Get allowed origins from environment variable
   ALLOWED_ORIGINS = os.getenv(
       "ALLOWED_ORIGINS",
       "https://yourdomain.com,https://www.yourdomain.com"
   ).split(",")

   app.add_middleware(
       CORSMiddleware,
       allow_origins=ALLOWED_ORIGINS,
       allow_credentials=True,
       allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
       allow_headers=["*"],
   )
   ```

2. **Update `.env` file on server**:

   ```env
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

## Frontend API URL Configuration

### Update `.env.production`

Make sure your frontend environment variable points to your production API:

```env
# If using Nginx reverse proxy (recommended)
NEXT_PUBLIC_API_URL=https://yourdomain.com/api

# Or if backend is on a subdomain
NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# Or if using direct IP (not recommended for production)
NEXT_PUBLIC_API_URL=https://YOUR_SERVER_IP:8000
```

## Nginx Production Configuration

### Enhanced Security Headers

Update your Nginx configuration to include security headers:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration (Certbot will manage this)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Frontend (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API (FastAPI)
    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend endpoints (direct access)
    location ~ ^/(upload|extract-metadata|analyze|status|document|documents|chat|demand-letter)/ {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Increase body size limit for file uploads
    client_max_body_size 50M;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
}
```

## Environment Variables for Production

### Backend (.env)

```env
# API Configuration
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
PORT=8000
ENVIRONMENT=production

# Gemini AI
GEMINI_API_KEY=your_production_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash-exp

# ElevenLabs
ELEVENLABS_API_KEY=your_production_elevenlabs_api_key

# Snowflake Database
SNOWFLAKE_ACCOUNT=your_snowflake_account
SNOWFLAKE_USER=your_snowflake_user
SNOWFLAKE_PASSWORD=your_snowflake_password
SNOWFLAKE_WAREHOUSE=your_warehouse
SNOWFLAKE_DATABASE=your_database
SNOWFLAKE_SCHEMA=your_schema

# Logging
LOG_LEVEL=INFO
```

### Frontend (.env.production)

```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NODE_ENV=production
```

## FastAPI Production Settings

### Update Uvicorn Configuration

For production, use multiple workers and better settings:

1. **Update systemd service** (`/etc/systemd/system/fastapi.service`):

```ini
[Unit]
Description=FastAPI Backend
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/home/deploy/clause_backend/app
Environment="PATH=/home/deploy/clause_backend/venv/bin"
EnvironmentFile=/home/deploy/clause_backend/.env
ExecStart=/home/deploy/clause_backend/venv/bin/uvicorn api_v2:app --host 0.0.0.0 --port 8000 --workers 4 --log-level info
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Note**: Adjust the number of workers based on your server's CPU cores (typically 2-4x the number of CPU cores).

## Next.js Production Settings

### PM2 Configuration

Create a PM2 ecosystem file for better process management:

1. **Create `ecosystem.config.js`** in your project root:

```javascript
module.exports = {
  apps: [
    {
      name: "nextjs-app",
      script: "npm",
      args: "start",
      cwd: "/home/deploy/YOUR_REPO",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "/home/deploy/logs/nextjs-error.log",
      out_file: "/home/deploy/logs/nextjs-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      max_memory_restart: "1G",
    },
  ],
};
```

2. **Start with PM2 ecosystem**:

```bash
pm2 start ecosystem.config.js
pm2 save
```

## Logging Configuration

### Backend Logging

1. **Create logs directory**:

```bash
mkdir -p /home/deploy/clause_backend/app/logs
```

2. **Configure logging in FastAPI** (if not already configured):

```python
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/home/deploy/clause_backend/app/logs/app.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
```

### Frontend Logging

PM2 will handle logging automatically if you use the ecosystem file above.

## Database Configuration (if using PostgreSQL)

If you're using PostgreSQL in production:

1. **Install PostgreSQL**:

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

2. **Create database and user**:

```bash
sudo -u postgres psql
CREATE DATABASE lease_analyzer;
CREATE USER lease_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE lease_analyzer TO lease_user;
\q
```

3. **Update environment variables**:

```env
DATABASE_URL=postgresql://lease_user:secure_password@localhost:5432/lease_analyzer
```

## File Storage Configuration

### Local Storage (Current Setup)

Files are stored locally on the server. Ensure adequate disk space:

```bash
# Check disk space
df -h

# Set up automatic cleanup for old files (optional)
# Add to crontab: 0 2 * * * find /home/deploy/clause_backend/uploads -type f -mtime +30 -delete
```

### Cloud Storage (Recommended for Production)

Consider using cloud storage (AWS S3, Google Cloud Storage, etc.) for better scalability:

1. **Install boto3** (for AWS S3):

```bash
pip install boto3
```

2. **Update upload endpoint** to use cloud storage
3. **Update environment variables**:

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
```

## Monitoring and Alerting

### Set Up Uptime Monitoring

1. **Use services like**:
   - UptimeRobot (free tier available)
   - Pingdom
   - StatusCake

2. **Monitor endpoints**:
   - Frontend: `https://yourdomain.com`
   - Backend health: `https://yourdomain.com/api/`
   - API docs: `https://yourdomain.com/api/docs`

### Server Monitoring

1. **Install monitoring tools**:

```bash
# Install htop for resource monitoring
sudo apt install -y htop

# Install netdata for comprehensive monitoring (optional)
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

## Backup Strategy

### Automated Backups

1. **Enable Vultr backups** (in Vultr dashboard)
2. **Set up manual backups**:

```bash
# Create backup script
nano /home/deploy/backup.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/deploy/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application code
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /home/deploy/YOUR_REPO

# Backup database (if using PostgreSQL)
pg_dump -U lease_user lease_analyzer > $BACKUP_DIR/db_$DATE.sql

# Backup uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /home/deploy/clause_backend/uploads

# Keep only last 7 days of backups
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

3. **Make executable and add to crontab**:

```bash
chmod +x /home/deploy/backup.sh
crontab -e
# Add: 0 3 * * * /home/deploy/backup.sh
```

## Performance Optimization

### Enable Gzip Compression (already in Nginx config above)

### Enable Caching

Add caching headers in Nginx for static assets:

```nginx
# Cache static assets
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Database Optimization

- Add indexes to frequently queried columns
- Regularly vacuum and analyze database (if using PostgreSQL)
- Monitor slow queries

## Security Checklist

- [ ] CORS configured to allow only your domain
- [ ] SSL/HTTPS enabled
- [ ] Security headers configured in Nginx
- [ ] Firewall configured (only necessary ports open)
- [ ] SSH key authentication enabled
- [ ] Fail2ban installed and configured
- [ ] Regular security updates enabled
- [ ] Strong passwords used for all services
- [ ] Environment variables secured (not in version control)
- [ ] API keys rotated regularly
- [ ] Logs monitored for suspicious activity

## Troubleshooting Production Issues

### High Memory Usage

```bash
# Check memory usage
free -h
pm2 monit
htop

# Restart services if needed
pm2 restart nextjs-app
sudo systemctl restart fastapi
```

### High CPU Usage

```bash
# Check CPU usage
top
htop

# Identify processes using CPU
ps aux --sort=-%cpu | head -10
```

### Disk Space Issues

```bash
# Check disk usage
df -h
du -sh /home/deploy/*

# Clean up old files
sudo apt autoremove
sudo apt autoclean
```

### Application Errors

```bash
# Check application logs
pm2 logs nextjs-app --lines 100
sudo journalctl -u fastapi -n 100
sudo tail -f /var/log/nginx/error.log
```

## Rollback Procedure

If you need to rollback to a previous version:

1. **Stop services**:

```bash
pm2 stop nextjs-app
sudo systemctl stop fastapi
```

2. **Restore from backup**:

```bash
cd /home/deploy
tar -xzf backups/app_YYYYMMDD_HHMMSS.tar.gz
```

3. **Restore database** (if using PostgreSQL):

```bash
psql -U lease_user lease_analyzer < backups/db_YYYYMMDD_HHMMSS.sql
```

4. **Restart services**:

```bash
pm2 start nextjs-app
sudo systemctl start fastapi
```

## Support and Maintenance

### Regular Maintenance Tasks

- **Weekly**: Check logs, monitor resources
- **Monthly**: Update system packages, update dependencies
- **Quarterly**: Security audit, performance review
- **As needed**: Deploy updates, fix bugs

### Useful Commands

```bash
# View all running services
pm2 status
sudo systemctl list-units --type=service --state=running

# Check server resources
htop
df -h
free -h

# View recent logs
pm2 logs nextjs-app --lines 50
sudo journalctl -u fastapi --since "1 hour ago"

# Restart all services
pm2 restart all
sudo systemctl restart fastapi
sudo systemctl restart nginx
```

---

Remember to test all configurations in a staging environment before applying to production!

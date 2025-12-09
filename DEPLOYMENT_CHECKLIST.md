# Deployment Checklist

Use this checklist to ensure you've completed all steps for deploying to Vultr.

## Pre-Deployment

- [ ] Vultr account created and verified
- [ ] Payment method added to Vultr account
- [ ] Domain name purchased (optional but recommended)
- [ ] SSH key pair generated (recommended for security)
- [ ] All environment variables documented (API keys, database credentials, etc.)
- [ ] Code pushed to Git repository (or ready to upload)

## Server Setup

- [ ] VPS instance created on Vultr
- [ ] Server IP address noted
- [ ] Connected to server via SSH
- [ ] System updated (`apt update && apt upgrade`)
- [ ] Non-root user created with sudo privileges
- [ ] Firewall configured (UFW)
- [ ] Essential tools installed (git, curl, wget, build-essential)

## Backend Setup (FastAPI)

- [ ] Python 3.11+ installed
- [ ] Virtual environment created
- [ ] Python dependencies installed
- [ ] Environment variables configured (`.env` file)
- [ ] Required directories created (data, uploads, logs)
- [ ] Backend tested manually (`uvicorn api_v2:app`)
- [ ] Systemd service created and enabled
- [ ] Backend service running and auto-starts on boot

## Frontend Setup (Next.js)

- [ ] Node.js 20.x installed
- [ ] PM2 installed globally
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env.production`)
- [ ] Frontend built successfully (`npm run build`)
- [ ] PM2 process started and saved
- [ ] PM2 startup script configured
- [ ] Frontend accessible on port 3000

## Nginx Configuration

- [ ] Nginx installed
- [ ] Nginx configuration file created
- [ ] Reverse proxy configured for frontend (port 3000)
- [ ] Reverse proxy configured for backend (port 8000)
- [ ] Nginx configuration tested (`nginx -t`)
- [ ] Nginx service enabled and running
- [ ] Firewall updated (ports 3000 and 8000 removed if using Nginx)

## SSL/HTTPS

- [ ] Domain DNS configured (A record pointing to server IP)
- [ ] DNS propagation verified
- [ ] Certbot installed
- [ ] SSL certificate obtained
- [ ] Nginx configured for HTTPS
- [ ] HTTP to HTTPS redirect configured
- [ ] SSL certificate auto-renewal tested

## Environment Variables

### Backend (.env)

- [ ] GEMINI_API_KEY
- [ ] ELEVENLABS_API_KEY
- [ ] SNOWFLAKE_ACCOUNT
- [ ] SNOWFLAKE_USER
- [ ] SNOWFLAKE_PASSWORD
- [ ] SNOWFLAKE_WAREHOUSE
- [ ] SNOWFLAKE_DATABASE
- [ ] SNOWFLAKE_SCHEMA
- [ ] PORT=8000

### Frontend (.env.production)

- [ ] NEXT_PUBLIC_API_URL (should point to your domain/api or server IP:8000)

## Security

- [ ] SSH key authentication configured
- [ ] Password authentication disabled (optional but recommended)
- [ ] Fail2ban installed and configured
- [ ] Firewall rules reviewed and minimal
- [ ] Regular user created (not using root)
- [ ] Server regularly updated
- [ ] Strong passwords used for all services

## Testing

- [ ] Frontend accessible via domain/IP
- [ ] Backend API accessible (check `/docs` endpoint)
- [ ] File upload functionality tested
- [ ] Chat functionality tested
- [ ] Voice chat functionality tested
- [ ] Analysis generation tested
- [ ] Demand letter generation tested
- [ ] All API endpoints responding correctly

## Monitoring

- [ ] PM2 monitoring set up (`pm2 monit`)
- [ ] Systemd service logs accessible
- [ ] Nginx logs accessible
- [ ] Server resource monitoring (CPU, RAM, Disk)
- [ ] Application error tracking (if applicable)

## Backup

- [ ] Vultr automatic backups enabled (optional)
- [ ] Manual backup procedure documented
- [ ] Backup restoration tested

## Documentation

- [ ] Server IP/domain documented
- [ ] SSH access information secured
- [ ] Environment variables backed up securely
- [ ] Deployment procedure documented
- [ ] Rollback procedure documented

## Post-Deployment

- [ ] Application fully functional
- [ ] All features tested
- [ ] Performance acceptable
- [ ] Error handling working
- [ ] Logs being generated correctly
- [ ] Monitoring alerts configured (if applicable)

## Maintenance Schedule

- [ ] Weekly: Check server logs
- [ ] Monthly: Update system packages
- [ ] Monthly: Update application dependencies
- [ ] Quarterly: Review security settings
- [ ] As needed: Deploy application updates

## Quick Commands Reference

```bash
# Check service status
pm2 status
sudo systemctl status fastapi
sudo systemctl status nginx

# View logs
pm2 logs nextjs-app
sudo journalctl -u fastapi -f
sudo tail -f /var/log/nginx/error.log

# Restart services
pm2 restart nextjs-app
sudo systemctl restart fastapi
sudo systemctl restart nginx

# Update application
git pull origin main
cd clause_backend && source venv/bin/activate && pip install -r requirements.txt && sudo systemctl restart fastapi
cd .. && npm install && npm run build && pm2 restart nextjs-app
```

## Support Contacts

- Vultr Support: https://www.vultr.com/support/
- Server IP: **\*\***\_\_\_**\*\***
- Domain: **\*\***\_\_\_**\*\***
- SSH User: **\*\***\_\_\_**\*\***
- Deployment Date: **\*\***\_\_\_**\*\***

---

**Note**: Keep this checklist updated as you complete each step. This will help you track your deployment progress and troubleshoot any issues.

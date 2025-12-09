# Complete Vultr Deployment Guide for Next.js + FastAPI Application

This guide provides step-by-step instructions for deploying your Next.js frontend and FastAPI backend application to Vultr. Vultr is a cloud infrastructure provider that offers Virtual Private Servers (VPS) and other cloud services. We'll deploy both applications on a single VPS instance, though you can also separate them for better scalability.

## Overview

Your application consists of:

- **Frontend**: Next.js application (runs on Node.js, typically port 3000 in development)
- **Backend**: FastAPI application (runs on Python with Uvicorn, typically port 8000)
- **Requirements**: Both services need to run simultaneously and communicate with each other

## Step 1: Create a Vultr Account and Server

1. **Sign up for Vultr**:
   - Go to https://www.vultr.com/
   - Click "Sign Up" and create an account
   - Verify your email address
   - Add payment method (credit card or PayPal)

2. **Create a VPS Instance**:
   - Log into your Vultr dashboard
   - Click "Products" → "Deploy Server" or "Deploy Instance"
   - Choose your configuration:
     - **Server Type**: Cloud Compute (Regular Performance)
     - **Server Location**: Select a location closest to your users (e.g., US East, US West, Europe)
     - **Operating System**: Ubuntu 22.04 LTS (recommended) or Ubuntu 24.04 LTS
     - **Server Size**:
       - Minimum: $6/month (1 vCPU, 1GB RAM, 25GB SSD) - suitable for testing
       - Recommended: $12/month (1 vCPU, 2GB RAM, 55GB SSD) - better for production
       - For production with traffic: $24/month (2 vCPU, 4GB RAM, 80GB SSD) or higher
     - **Additional Features**:
       - Enable "Enable IPv6" (optional but recommended)
       - Enable "Auto Backups" (recommended for production, costs extra)
     - **SSH Keys**: Add your SSH public key if you have one (recommended for security)
   - Click "Deploy Now"
   - Wait 2-5 minutes for the server to be provisioned

3. **Get Server Information**:
   - Once deployed, note down:
     - **Server IP Address** (e.g., 192.0.2.1)
     - **Root Password** (if you didn't use SSH keys, copy this password)
     - **Server Details**: CPU, RAM, Disk space

## Step 2: Connect to Your Server via SSH

1. **On Windows** (using PowerShell or Command Prompt):

   ```bash
   ssh root@YOUR_SERVER_IP
   ```

   - Replace `YOUR_SERVER_IP` with your actual server IP address
   - If prompted, type "yes" to accept the server's fingerprint
   - Enter the root password when prompted (or use your SSH key if configured)

2. **On macOS/Linux**:

   ```bash
   ssh root@YOUR_SERVER_IP
   ```

3. **If you need to use a password** (and haven't set up SSH keys):
   - The password will be shown in the Vultr dashboard under "Server Details"
   - Copy and paste it when prompted (password won't be visible as you type)

## Step 3: Initial Server Setup and Security

1. **Update the system**:

   ```bash
   apt update && apt upgrade -y
   ```

2. **Create a non-root user** (recommended for security):

   ```bash
   adduser deploy
   usermod -aG sudo deploy
   su - deploy
   ```

3. **Set up firewall** (UFW - Uncomplicated Firewall):

   ```bash
   sudo ufw allow OpenSSH
   sudo ufw allow 80/tcp   # HTTP
   sudo ufw allow 443/tcp  # HTTPS
   sudo ufw allow 8000/tcp # FastAPI backend (or remove if using reverse proxy)
   sudo ufw allow 3000/tcp # Next.js frontend (or remove if using reverse proxy)
   sudo ufw enable
   sudo ufw status
   ```

4. **Install essential tools**:
   ```bash
   sudo apt install -y git curl wget build-essential
   ```

## Step 4: Install Node.js and npm

1. **Install Node.js 20.x** (LTS version, recommended for Next.js):

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   node --version  # Should show v20.x.x
   npm --version   # Should show 10.x.x
   ```

2. **Install PM2** (Process Manager for Node.js applications):
   ```bash
   sudo npm install -g pm2
   pm2 --version
   ```

## Step 5: Install Python and Dependencies

1. **Install Python 3.11 or 3.12**:

   ```bash
   sudo apt install -y python3.11 python3.11-venv python3.11-dev python3-pip
   python3 --version  # Should show Python 3.11.x or higher
   ```

2. **Install additional system dependencies** (for PDF processing, etc.):
   ```bash
   sudo apt install -y \
     libpq-dev \
     postgresql-client \
     libffi-dev \
     libssl-dev \
     pkg-config \
     poppler-utils \
     tesseract-ocr \
     libtesseract-dev
   ```

## Step 6: Set Up the Backend (FastAPI)

1. **Clone your repository** (or upload your code):

   ```bash
   cd /home/deploy
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO/clause_backend
   ```

   **Alternative: Upload files via SCP** (from your local machine):

   ```bash
   # From your local machine
   scp -r clause_backend deploy@YOUR_SERVER_IP:/home/deploy/
   ```

2. **Create a virtual environment**:

   ```bash
   cd /home/deploy/clause_backend
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies**:

   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   # If you don't have requirements.txt, install manually:
   pip install fastapi uvicorn python-dotenv google-generativeai elevenlabs httpx jieba pycccedict langdetect snowflake-connector-python PyPDF2
   ```

4. **Set up environment variables**:

   ```bash
   cd /home/deploy/clause_backend
   nano .env
   ```

   Add your environment variables:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   SNOWFLAKE_ACCOUNT=your_snowflake_account
   SNOWFLAKE_USER=your_snowflake_user
   SNOWFLAKE_PASSWORD=your_snowflake_password
   SNOWFLAKE_WAREHOUSE=your_warehouse
   SNOWFLAKE_DATABASE=your_database
   SNOWFLAKE_SCHEMA=your_schema
   PORT=8000
   ```

   Save and exit (Ctrl+X, then Y, then Enter)

5. **Create necessary directories**:

   ```bash
   mkdir -p /home/deploy/clause_backend/data
   mkdir -p /home/deploy/clause_backend/uploads
   mkdir -p /home/deploy/clause_backend/app/logs
   ```

6. **Test the backend**:

   ```bash
   cd /home/deploy/clause_backend/app
   python3 -m uvicorn api_v2:app --host 0.0.0.0 --port 8000
   ```

   - Open your browser and go to `http://YOUR_SERVER_IP:8000/docs`
   - You should see the FastAPI documentation
   - Press Ctrl+C to stop the server

7. **Create a systemd service for the backend** (runs automatically on boot):

   ```bash
   sudo nano /etc/systemd/system/fastapi.service
   ```

   Add the following content:

   ```ini
   [Unit]
   Description=FastAPI Backend
   After=network.target

   [Service]
   Type=simple
   User=deploy
   WorkingDirectory=/home/deploy/clause_backend/app
   Environment="PATH=/home/deploy/clause_backend/venv/bin"
   ExecStart=/home/deploy/clause_backend/venv/bin/uvicorn api_v2:app --host 0.0.0.0 --port 8000
   Restart=always
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

   Save and exit, then enable and start the service:

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable fastapi
   sudo systemctl start fastapi
   sudo systemctl status fastapi
   ```

## Step 7: Set Up the Frontend (Next.js)

1. **Navigate to the frontend directory**:

   ```bash
   cd /home/deploy/YOUR_REPO  # or wherever your Next.js app is
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create environment variables**:

   ```bash
   nano .env.production
   ```

   Add:

   ```env
   NEXT_PUBLIC_API_URL=http://YOUR_SERVER_IP:8000
   # Or if using a domain:
   # NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   ```

4. **Build the Next.js application**:

   ```bash
   npm run build
   ```

   This creates an optimized production build in the `.next` directory.

5. **Start the Next.js application with PM2**:

   ```bash
   pm2 start npm --name "nextjs-app" -- start
   pm2 save
   pm2 startup
   ```

   Follow the instructions provided by `pm2 startup` to enable PM2 on system boot.

6. **Verify PM2 is running**:
   ```bash
   pm2 status
   pm2 logs nextjs-app
   ```

## Step 8: Set Up Nginx Reverse Proxy (Recommended)

Using Nginx as a reverse proxy provides:

- SSL/HTTPS termination
- Better security
- Domain name routing
- Load balancing (if needed)

1. **Install Nginx**:

   ```bash
   sudo apt install -y nginx
   sudo systemctl enable nginx
   sudo systemctl start nginx
   ```

2. **Configure Nginx for the frontend**:

   ```bash
   sudo nano /etc/nginx/sites-available/nextjs-app
   ```

   Add the following configuration:

   ```nginx
   server {
       listen 80;
       server_name YOUR_DOMAIN_OR_IP;

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
   }
   ```

   Save and exit.

3. **Enable the site**:

   ```bash
   sudo ln -s /etc/nginx/sites-available/nextjs-app /etc/nginx/sites-enabled/
   sudo nginx -t  # Test configuration
   sudo systemctl reload nginx
   ```

4. **Update firewall** (remove direct access to ports 3000 and 8000 if using Nginx):
   ```bash
   sudo ufw delete allow 3000/tcp
   sudo ufw delete allow 8000/tcp
   ```

## Step 9: Set Up SSL Certificate with Let's Encrypt

1. **Install Certbot**:

   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. **Obtain SSL certificate** (replace with your domain):

   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

   - Follow the prompts
   - Enter your email address
   - Agree to terms of service
   - Choose whether to redirect HTTP to HTTPS (recommended: Yes)

3. **Test automatic renewal**:

   ```bash
   sudo certbot renew --dry-run
   ```

4. **Update Nginx configuration** (Certbot should have done this automatically):
   - Your site should now be accessible via HTTPS
   - HTTP traffic should redirect to HTTPS

## Step 10: Update Frontend Environment Variables

1. **Update the frontend `.env.production`**:

   ```bash
   cd /home/deploy/YOUR_REPO
   nano .env.production
   ```

   Change to:

   ```env
   NEXT_PUBLIC_API_URL=https://yourdomain.com/api
   # Or if using a subdomain:
   # NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   ```

2. **Rebuild and restart the frontend**:
   ```bash
   npm run build
   pm2 restart nextjs-app
   ```

## Step 11: Configure Domain Name (Optional but Recommended)

1. **Purchase a domain** (if you don't have one):
   - Use services like Namecheap, Google Domains, or Cloudflare
   - Purchase a domain (e.g., `yourdomain.com`)

2. **Configure DNS records**:
   - Log into your domain registrar's DNS management
   - Add an A record:
     - **Type**: A
     - **Name**: @ (or leave blank for root domain)
     - **Value**: YOUR_SERVER_IP
     - **TTL**: 3600 (or default)
   - Add a CNAME record for www (optional):
     - **Type**: CNAME
     - **Name**: www
     - **Value**: yourdomain.com
     - **TTL**: 3600

3. **Wait for DNS propagation** (can take up to 48 hours, usually much faster):
   - Use tools like https://dnschecker.org/ to verify

## Step 12: Monitoring and Maintenance

1. **Monitor application logs**:

   ```bash
   # PM2 logs (frontend)
   pm2 logs nextjs-app

   # Systemd logs (backend)
   sudo journalctl -u fastapi -f

   # Nginx logs
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

2. **Check application status**:

   ```bash
   # PM2 status
   pm2 status
   pm2 monit

   # Systemd status
   sudo systemctl status fastapi
   sudo systemctl status nginx
   ```

3. **Set up automatic backups** (recommended):
   - Enable Vultr automatic backups (in Vultr dashboard)
   - Or set up manual backups using rsync or similar tools

4. **Update your application**:

   ```bash
   # Pull latest changes
   cd /home/deploy/YOUR_REPO
   git pull origin main

   # Update backend
   cd clause_backend
   source venv/bin/activate
   pip install -r requirements.txt
   sudo systemctl restart fastapi

   # Update frontend
   cd ..
   npm install
   npm run build
   pm2 restart nextjs-app
   ```

## Step 13: Security Best Practices

1. **Keep system updated**:

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Configure SSH key authentication** (disable password authentication):

   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PasswordAuthentication no
   # Set: PubkeyAuthentication yes
   sudo systemctl restart sshd
   ```

3. **Set up fail2ban** (protects against brute force attacks):

   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

4. **Regular security audits**:
   - Review logs regularly
   - Keep dependencies updated
   - Monitor server resources

## Troubleshooting

1. **Application not accessible**:
   - Check firewall: `sudo ufw status`
   - Check if services are running: `pm2 status` and `sudo systemctl status fastapi`
   - Check Nginx: `sudo nginx -t` and `sudo systemctl status nginx`
   - Check logs for errors

2. **Backend not responding**:
   - Check FastAPI service: `sudo systemctl status fastapi`
   - Check logs: `sudo journalctl -u fastapi -n 50`
   - Verify environment variables are set correctly
   - Check if port 8000 is accessible: `curl http://localhost:8000/docs`

3. **Frontend not building**:
   - Check Node.js version: `node --version`
   - Clear cache: `rm -rf .next node_modules` and `npm install`
   - Check for errors in build output: `npm run build`

4. **SSL certificate issues**:
   - Verify DNS is pointing to your server
   - Check Nginx configuration: `sudo nginx -t`
   - Renew certificate manually: `sudo certbot renew`

## Cost Estimation

- **VPS Server**: $6-24/month (depending on size)
- **Domain Name**: $10-15/year
- **SSL Certificate**: Free (Let's Encrypt)
- **Backups**: $2.40-9.60/month (optional, 20% of server cost)
- **Total**: Approximately $8-30/month for basic setup

## Additional Resources

- Vultr Documentation: https://docs.vultr.com/
- Next.js Deployment: https://nextjs.org/docs/deployment
- FastAPI Deployment: https://fastapi.tiangolo.com/deployment/
- Nginx Documentation: https://nginx.org/en/docs/
- Let's Encrypt Documentation: https://letsencrypt.org/docs/

## Conclusion

Your application should now be deployed and accessible via your domain (or IP address). The setup includes:

- FastAPI backend running on port 8000 (behind Nginx)
- Next.js frontend running on port 3000 (behind Nginx)
- SSL/HTTPS encryption
- Automatic service restart on server reboot
- Process management with PM2 and systemd
- Firewall protection
- Reverse proxy for better security and performance

Remember to:

- Keep your server and dependencies updated
- Monitor logs regularly
- Set up backups
- Secure your server with SSH keys and fail2ban
- Update your application code regularly

Good luck with your deployment!

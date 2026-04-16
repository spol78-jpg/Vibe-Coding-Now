#!/bin/bash
set -e

echo "═══════════════════════════════════════"
echo "  Vibe Coding Now — Server Setup"
echo "  Domain: neiroagent.online"
echo "═══════════════════════════════════════"

# ─── 1. Update system ───
echo ""
echo "► [1/6] Updating system..."
apt-get update -y && apt-get upgrade -y
apt-get install -y curl git nginx ufw

# ─── 2. Install Node.js 20 LTS ───
echo ""
echo "► [2/6] Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
node --version
npm --version

# ─── 3. Install PM2 ───
echo ""
echo "► [3/6] Installing PM2..."
npm install -g pm2
pm2 --version

# ─── 4. Clone repository ───
echo ""
echo "► [4/6] Cloning repository..."
mkdir -p /var/www
cd /var/www

if [ -d "Vibe-Coding-Now" ]; then
  echo "  Directory exists, pulling latest..."
  cd Vibe-Coding-Now
  git pull
else
  git clone https://github.com/spol78-jpg/Vibe-Coding-Now.git
  cd Vibe-Coding-Now
fi

# ─── 5. Install deps & build ───
echo ""
echo "► [5/6] Installing dependencies and building..."
npm install
export NODE_OPTIONS="--max_old_space_size=1536"
npm run build 2>&1 | tee /tmp/build.log
if [ ${PIPESTATUS[0]} -ne 0 ]; then
  echo ""
  echo "❌ Build failed! Last 50 lines of log:"
  tail -50 /tmp/build.log
  exit 1
fi

# ─── 6. Start with PM2 ───
echo ""
echo "► [6/6] Starting app with PM2..."
pm2 delete vibe-coding-now 2>/dev/null || true
pm2 start npm --name "vibe-coding-now" -- start
pm2 save
pm2 startup systemd -u root --hp /root | tail -1 | bash || true

# ─── 7. Configure Nginx ───
echo ""
echo "► Configuring Nginx..."
cat > /etc/nginx/sites-available/vibe-coding-now << 'NGINX'
server {
    listen 80;
    server_name neiroagent.online www.neiroagent.online;

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
}
NGINX

ln -sf /etc/nginx/sites-available/vibe-coding-now /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
systemctl enable nginx

# ─── 8. Firewall ───
echo ""
echo "► Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# ─── Done ───
echo ""
echo "═══════════════════════════════════════"
echo "  ✅ Setup complete!"
echo ""
echo "  App:    http://neiroagent.online"
echo "  PM2:    pm2 status"
echo "  Logs:   pm2 logs vibe-coding-now"
echo "  Nginx:  systemctl status nginx"
echo "═══════════════════════════════════════"

#!/bin/bash

# Server Setup Script for Mahyar Frontend
# Run this on your server to prepare it for deployment

set -e

echo "Setting up server for Mahyar Frontend deployment..."

# Update system
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Create project directory
echo "📁 Creating project directory..."
sudo mkdir -p /var/www/mahyar-frontend
sudo chown $USER:$USER /var/www/mahyar-frontend

# Clone repository (if not exists)
if [ ! -d "/var/www/mahyar-frontend/.git" ]; then
    echo "📥 Cloning repository..."
    cd /var/www/mahyar-frontend
    git clone https://github.com/your-username/your-repo.git .
else
    echo "Repository already exists"
fi

# Create .env file for server
echo "⚙️ Creating environment file..."
cat > /var/www/mahyar-frontend/.env << EOF
NODE_ENV=production
SERVER_HOST=$(hostname -I | awk '{print $1}')
EOF

# Set up firewall (optional)
echo "🔥 Setting up firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 5173/tcp
sudo ufw --force enable

echo "✅ Server setup completed!"
echo "📋 Next steps:"
echo "1. Add SSH key to GitHub repository secrets"
echo "2. Update SERVER_HOST, SERVER_USER in GitHub secrets"
echo "3. Push to dev branch to trigger deployment" 
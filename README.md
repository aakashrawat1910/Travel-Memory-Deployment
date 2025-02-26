# Travel Memory Application Deployment

A web application for storing and sharing travel memories with backend running on Node.js and frontend built with React.

## Deployment Architecture

The application uses a distributed architecture with the following components:
- Frontend: React-based UI hosted on EC2 instances
- Backend: Node.js API server hosted on EC2 instances
- Load Balancer: Distributes traffic across multiple instances
- Cloudflare: Manages DNS and provides security features

## Deployment Instructions

### 1. Backend Configuration

1. Clone the repository and navigate to the backend directory
```bash
git clone [repository-url]
cd travel-memory-app/backend
```

2. Install Node.js (as shown in the screenshot)
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

![Installing Nodejs](screenshots/installing_nodejs.png)

3. Clone the repository (as shown in the screenshot)
```bash
git clone https://github.com/yourusername/travel-memory-app.git
cd travel-memory-app/backend
```

![Cloning Directory](screenshots/cloning_directory.png)

4. Create and update the `.env` file with database connection details and port configuration
```bash
# Example .env file
PORT=3000
DB_CONNECTION_STRING=your_connection_string
```

![Creating .env file](screenshots/creating_env_file.png)

5. Install dependencies and start the backend server
```bash
npm install
npm start
```

![Running the backend](screenshots/running_backend.png)

6. Set up Nginx as a reverse proxy
```bash
sudo apt-get install nginx
```

![Installing nginx](screenshots/installing_nginx.png)

7. Configure Nginx to proxy requests to the Node.js application
```bash
sudo nano /etc/nginx/sites-available/default
```

```
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

![Setting up reverse proxy](screenshots/setting_up_reverse_proxy.png)

8. Restart Nginx
```bash
sudo systemctl restart nginx
```

9. Access the backend through port 80

![Accessible on Port 80](screenshots/accessible_port_80.png)

### 2. Frontend and Backend Connection

1. Navigate to the frontend directory
```bash
cd ../frontend
```

2. Update the `urls.js` file to connect with the backend
```javascript
// Example urls.js
export const API_BASE_URL = "http://your-backend-url";
```

![Updating url.js](screenshots/updating_url_js.png)

3. Install dependencies and start the frontend
```bash
npm install
npm start
```

![Running the Frontend](screenshots/running_frontend.png)

4. Access the frontend application

![Accessing Frontend](screenshots/accessing_frontend.png)

5. Set up Nginx for the frontend similar to the backend setup

![Setting up Reverse proxy](screenshots/frontend_reverse_proxy.png)

6. Access the frontend through port 80

![Accessing Port 80](screenshots/frontend_port_80.png)

### 3. Scaling the Application

1. Create Amazon Machine Images (AMIs) of your configured instances
   - EC2 Dashboard → Select instance → Actions → Image → Create image

![Creating AMI](screenshots/creating_ami.png)

2. Launch additional EC2 instances using the AMIs

![Launching EC2 instances from AMI](screenshots/launching_ec2_from_ami.png)

3. Create Target Groups for load balancing
   - EC2 Dashboard → Target Groups → Create target group
   - Add instances to appropriate target groups

![Creating Target Groups](screenshots/creating_target_groups.png)

4. Create a Load Balancer
   - EC2 Dashboard → Load Balancers → Create Load Balancer
   - Configure the load balancer to use the target groups

![Creating the load balancer based on target groups](screenshots/creating_load_balancer.png)

### 4. Domain Setup with Cloudflare

1. Add your domain to Cloudflare

2. Create a CNAME record pointing to the load balancer endpoint
   - Type: CNAME
   - Name: www
   - Target: [load-balancer-dns]
   - TTL: Auto

3. Create an A record for the root domain
   - Type: A
   - Name: @
   - IPv4 address: [EC2-instance-IP]
   - TTL: Auto

## Architecture Diagram

Create a deployment architecture diagram using [draw.io](https://www.draw.io/) to visualize the system architecture.

## Troubleshooting

- If the backend fails to start, check the `.env` file configuration
- If the frontend cannot connect to the backend, verify the URLs in `urls.js`
- If Nginx returns a 502 Bad Gateway, ensure your Node.js application is running
- For load balancer issues, check that target instances are healthy

## Maintenance

- Regularly update Node.js, npm packages, and the operating system
- Monitor EC2 instance performance
- Set up automated backups for your database

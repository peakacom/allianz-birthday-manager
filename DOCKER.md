# Docker Deployment Guide

## 🐳 Building and Running with Docker

This guide covers how to containerize and deploy the Allianz Birthday Manager application using Docker and nginx.

## Files Created

- **Dockerfile** - Multi-stage build configuration
- **nginx.conf** - Production nginx configuration
- **.dockerignore** - Excludes unnecessary files from build context

## Quick Start

### Build the Docker Image

```bash
docker build -t allianz-birthday-manager:latest .
```

### Run the Container

```bash
docker run -d -p 8080:80 --name birthday-app allianz-birthday-manager:latest
```

The application will be available at `http://localhost:8080`

## Docker Configuration Details

### Multi-Stage Dockerfile

The Dockerfile uses a two-stage build process:

**Stage 1: Builder**
- Base: `node:20-alpine`
- Installs dependencies
- Builds the React application with Vite
- Output: Production-ready static files in `/dist`

**Stage 2: Server**
- Base: `nginx:alpine`
- Copies built files from builder stage
- Uses custom nginx configuration
- Final image size: ~25-30MB (extremely lightweight!)

### Nginx Configuration Features

✅ **SPA Routing Support** - All routes redirect to `index.html`  
✅ **Gzip Compression** - Reduces bandwidth usage  
✅ **Static Asset Caching** - 1-year cache for images, CSS, JS  
✅ **Security Headers** - X-Frame-Options, X-Content-Type-Options, XSS Protection  
✅ **Health Check Endpoint** - `/health` for monitoring  

## Docker Commands

### Build Commands

```bash
# Build with tag
docker build -t allianz-birthday-manager:v1.0.0 .

# Build with no cache (clean build)
docker build --no-cache -t allianz-birthday-manager:latest .
```

### Run Commands

```bash
# Run in detached mode on port 8080
docker run -d -p 8080:80 --name birthday-app allianz-birthday-manager:latest

# Run with custom port (e.g., 3000)
docker run -d -p 3000:80 --name birthday-app allianz-birthday-manager:latest

# Run with restart policy
docker run -d -p 8080:80 --restart unless-stopped --name birthday-app allianz-birthday-manager:latest
```

### Management Commands

```bash
# View logs
docker logs birthday-app
docker logs -f birthday-app  # follow logs

# Stop container
docker stop birthday-app

# Start container
docker start birthday-app

# Restart container
docker restart birthday-app

# Remove container
docker rm -f birthday-app

# View running containers
docker ps

# View all containers
docker ps -a
```

### Image Management

```bash
# List images
docker images

# Remove image
docker rmi allianz-birthday-manager:latest

# Clean up unused images
docker image prune -a
```

## Docker Compose (Optional)

Create a `docker-compose.yml` for easier management:

```yaml
version: '3.8'

services:
  birthday-app:
    build: .
    container_name: allianz-birthday-manager
    ports:
      - "8080:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

Then use:

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Rebuild and start
docker-compose up -d --build
```

## Production Deployment

### Using Docker Registry

```bash
# Tag for registry
docker tag allianz-birthday-manager:latest registry.example.com/allianz-birthday-manager:v1.0.0

# Push to registry
docker push registry.example.com/allianz-birthday-manager:v1.0.0

# Pull and run on production server
docker pull registry.example.com/allianz-birthday-manager:v1.0.0
docker run -d -p 80:80 --restart unless-stopped registry.example.com/allianz-birthday-manager:v1.0.0
```

### Environment Variables (if needed)

If you need to pass environment variables:

```bash
docker run -d -p 8080:80 \
  -e API_URL=https://api.example.com \
  --name birthday-app \
  allianz-birthday-manager:latest
```

## Troubleshooting

### Check if container is running
```bash
docker ps | grep birthday-app
```

### View nginx error logs
```bash
docker logs birthday-app 2>&1 | grep error
```

### Access container shell
```bash
docker exec -it birthday-app sh
```

### Test nginx configuration
```bash
docker exec birthday-app nginx -t
```

### Check built files
```bash
docker exec birthday-app ls -la /usr/share/nginx/html
```

## Performance Tips

1. **Layer Caching**: Dependencies are installed before copying source code, so rebuilds are faster when only code changes
2. **Alpine Images**: Uses lightweight Alpine Linux base images
3. **Multi-stage Build**: Final image only contains nginx and built files, not build tools
4. **Static Asset Caching**: Browser caches assets for 1 year
5. **Gzip Compression**: Reduces transfer size by ~70%

## Security Considerations

✅ Non-root user in nginx alpine image  
✅ Security headers configured  
✅ No sensitive data in image layers  
✅ Minimal attack surface with alpine base  
✅ Regular image updates recommended  

## Image Size Comparison

- **Without multi-stage**: ~500MB+ (includes Node.js and build tools)
- **With multi-stage**: ~25-30MB (only nginx + static files)

**Size reduction: ~95%!**

## Next Steps

1. Build the image: `docker build -t allianz-birthday-manager .`
2. Test locally: `docker run -d -p 8080:80 allianz-birthday-manager`
3. Access: `http://localhost:8080`
4. Deploy to production server
5. Set up monitoring and logging

## Support

For issues or questions, check:
- Docker logs: `docker logs birthday-app`
- Nginx configuration: View `nginx.conf`
- Build process: Review `Dockerfile`

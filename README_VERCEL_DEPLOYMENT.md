# Vercel Deployment Guide

## Quick Start

### 1. Push to GitHub
Make sure your code is pushed to a GitHub repository:

```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Next.js project

### 3. Environment Variables

In the Vercel dashboard, add these environment variables:

#### Required Variables
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-here-minimum-32-characters
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ALLOWED_EMAILS=admin@yourdomain.com,another-admin@yourdomain.com
NODE_ENV=production
```

#### How to Get These Values:

**MongoDB URI:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Get your connection string from "Connect" → "Connect your application"
4. Replace `<password>` with your database password

**NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```
Or use any random string generator (minimum 32 characters)

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable "Google+ API" and "Google People API"
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Select "Web application"
6. Add authorized origins: `https://your-domain.vercel.app`
7. Add authorized redirect URIs: `https://your-domain.vercel.app/api/auth/callback/google`
8. Copy the Client ID and Client Secret

**ALLOWED_EMAILS:**
Comma-separated list of emails that should have admin access.

### 4. Deploy

Click "Deploy" button. Vercel will build and deploy your application.

### 5. Post-Deployment

1. **Test the deployment:** Visit your Vercel URL
2. **Verify admin access:** Try to access `/admin` and login with Google
3. **Check all functionality:** Add/edit portfolio items
4. **Update NEXTAUTH_URL:** Set it to your custom domain if you have one

## Custom Domain (Optional)

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Update `NEXTAUTH_URL` environment variable to your custom domain

## Environment Variables Summary

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `NEXTAUTH_URL` | Your deployed app URL | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | Secret for JWT signing | `random-32-char-string` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `123456789-abc.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | `GOCSPX-abc123` |
| `ALLOWED_EMAILS` | Admin email addresses | `admin@example.com,user@example.com` |
| `NODE_ENV` | Environment | `production` |

## Troubleshooting

### Common Issues

**Build Errors:**
- Check all environment variables are set
- Ensure MongoDB URI is correct and accessible
- Verify Google OAuth configuration

**Authentication Issues:**
- Make sure `NEXTAUTH_URL` matches your deployment URL exactly
- Check Google OAuth redirect URIs include your Vercel domain
- Verify `ALLOWED_EMAILS` contains your email

**Database Connection Issues:**
- Ensure MongoDB Atlas allows access from anywhere (0.0.0.0/0)
- Check if username/password in URI are correct
- Verify database name exists

### Debug Mode

Add this to your environment variables to enable debug logging:
```
NEXTAUTH_DEBUG=true
```

### Logs

Check Vercel Function Logs in the dashboard:
1. Go to your project
2. Click "Logs" tab
3. Filter by function to see API errors

## Performance Optimization

The project is already optimized for Vercel with:
- ✅ Static generation where possible
- ✅ Image optimization
- ✅ API route caching
- ✅ Security headers
- ✅ Compression enabled

## Security Checklist

- [ ] All environment variables are set
- [ ] MongoDB Atlas has IP whitelisting enabled
- [ ] Google OAuth redirect URIs are correct
- [ ] Custom domain uses HTTPS
- [ ] Admin emails are verified

## Monitoring

Vercel provides built-in monitoring:
- Real-time logs
- Performance metrics
- Error tracking
- Usage analytics

Check these in your Vercel dashboard under the "Analytics" and "Logs" tabs.

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables
3. Test Google OAuth configuration
4. Check MongoDB Atlas connection
5. Consult [Vercel documentation](https://vercel.com/docs)

# Step-by-Step Guide: Deploy to GitHub Pages with Custom Domain (sofa-anan.com)

This guide will walk you through deploying your website to GitHub Pages and connecting it to your GoDaddy domain.

## Prerequisites
- ✅ Your website code is ready in Visual Studio Code
- ✅ You have a GitHub account
- ✅ You own the domain "sofa-anan.com" in GoDaddy
- ✅ Node.js and npm are installed on your machine

---

## Part 1: Prepare Your Code (Already Done ✅)

The following changes have been made to your project:
1. ✅ Updated `vite.config.ts` to use `base: '/'` for custom domain
2. ✅ Created `public/CNAME` file with your domain name

---

## Part 2: Create and Push to GitHub Repository

### Step 1: Create a New GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `sofaanan` (or any name you prefer)
   - **Description**: (optional) "Anan Sofa Website"
   - **Visibility**: Choose **Public** (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (you already have these)
5. Click **"Create repository"**

### Step 2: Initialize Git and Push Your Code

Open your terminal in Visual Studio Code (Terminal → New Terminal) and run:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial commit: Website ready for deployment"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/sofaanan.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` with your actual GitHub username and `sofaanan` with your repository name if different.

---

## Part 3: Enable GitHub Pages

### Step 3: Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Click on **"Settings"** tab (at the top of the repository)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - **Source**: `GitHub Actions` (this will use your existing workflow)
5. The page will automatically deploy when you push to the `main` branch

### Step 4: Verify Deployment

1. After pushing your code, go to the **"Actions"** tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Once complete, go back to **Settings → Pages**
5. You'll see a message like: "Your site is live at https://YOUR_USERNAME.github.io/sofaanan/"
6. **Note**: This URL will work temporarily, but we'll configure your custom domain next

---

## Part 4: Configure Custom Domain in GitHub

### Step 5: Add Custom Domain to GitHub Pages

1. Still in **Settings → Pages**
2. Under **"Custom domain"**, enter: `sofa-anan.com`
3. Check the box **"Enforce HTTPS"** (recommended for security)
4. Click **"Save"**
5. GitHub will automatically create/update the CNAME file in your repository

**Important**: The CNAME file in your `public/` folder will be included in the build, which is correct. GitHub may also create one in the root, which is fine.

---

## Part 5: Configure DNS in GoDaddy

### Step 6: Access GoDaddy DNS Settings

1. Log in to your [GoDaddy account](https://www.godaddy.com)
2. Go to **"My Products"** or **"Domain Manager"**
3. Find your domain **"sofa-anan.com"** and click on it
4. Click on **"DNS"** or **"Manage DNS"**

### Step 7: Configure DNS Records

You need to add/update DNS records. **Delete any existing A records** for the root domain, then add:

#### For the root domain (sofa-anan.com):

**Option A: Using A Records (Recommended for stability)**
Add these 4 A records (all pointing to GitHub Pages IPs):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 seconds (or default) |
| A | @ | 185.199.109.153 | 600 seconds (or default) |
| A | @ | 185.199.110.153 | 600 seconds (or default) |
| A | @ | 185.199.111.153 | 600 seconds (or default) |

**Option B: Using CNAME (Simpler, but may have limitations)**
Add one CNAME record:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | YOUR_USERNAME.github.io | 600 seconds (or default) |

**Note**: Some registrars don't allow CNAME for root domain. If GoDaddy doesn't allow it, use Option A (A records).

#### For www subdomain (optional but recommended):

Add a CNAME record for www:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | YOUR_USERNAME.github.io | 600 seconds (or default) |

**Important**: Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 8: Save DNS Changes

1. Click **"Save"** or **"Add"** for each record
2. DNS changes can take **15 minutes to 48 hours** to propagate, but usually work within 1-2 hours

---

## Part 6: Verify Everything Works

### Step 9: Check DNS Propagation

You can check if DNS has propagated using these tools:
- [whatsmydns.net](https://www.whatsmydns.net) - Enter `sofa-anan.com` and check A records
- [dnschecker.org](https://dnschecker.org) - Check global DNS propagation

### Step 10: Test Your Website

1. Wait at least 15-30 minutes after configuring DNS
2. Open a new browser window (or use incognito mode)
3. Visit: `https://sofa-anan.com`
4. Your website should load!

**If it doesn't work:**
- Check that GitHub Actions deployment completed successfully
- Verify DNS records are correct in GoDaddy
- Wait a bit longer (DNS can take time)
- Clear your browser cache
- Try accessing via `http://sofa-anan.com` (without https) - it may take time for SSL to activate

---

## Troubleshooting

### Issue: Website shows 404 or doesn't load
- **Solution**: Check GitHub Actions tab - ensure the deployment workflow completed successfully
- Verify the CNAME file exists in your repository root (GitHub creates this automatically)

### Issue: DNS not resolving
- **Solution**: Double-check DNS records in GoDaddy match exactly what's shown above
- Wait longer (up to 48 hours for full propagation)
- Use DNS checker tools to verify propagation

### Issue: HTTPS not working
- **Solution**: In GitHub Pages settings, ensure "Enforce HTTPS" is checked
- It may take up to 24 hours for SSL certificate to be issued by GitHub

### Issue: Mixed content warnings
- **Solution**: Ensure all your image paths and assets use relative paths or HTTPS URLs

### Issue: Website shows old content
- **Solution**: Clear browser cache (Ctrl+Shift+Delete) or use incognito mode
- Check that your latest code was pushed to GitHub

---

## Future Updates

Whenever you make changes to your website:

1. Make your changes in Visual Studio Code
2. Commit and push:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push
   ```
3. GitHub Actions will automatically rebuild and redeploy your site
4. Changes will be live in 2-5 minutes

---

## Summary Checklist

- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Enabled GitHub Pages (using GitHub Actions)
- [ ] Added custom domain in GitHub Pages settings
- [ ] Configured DNS records in GoDaddy
- [ ] Waited for DNS propagation (15 min - 48 hours)
- [ ] Verified website loads at https://sofa-anan.com

---

## Need Help?

If you encounter issues:
1. Check the GitHub Actions logs in your repository
2. Verify DNS records using online DNS checker tools
3. Ensure all steps were followed correctly
4. GitHub Pages documentation: https://docs.github.com/en/pages

Good luck with your deployment! 🚀


from node:26.4-trixie as os

# Update package indexes and upgrade packages (for security updates)
run apt-get update && apt-get upgrade -y

# Install required OS applications 
run npm install --global npm@11.18.0 -y

# Prepare directory
run mkdir --parents /srv/app
workdir /srv/app
copy app . 
run npm install


from os as dev

expose 5173
cmd npm run dev -- --host


# Currently unused since it goes through Cloudflare Pages
from os as prod




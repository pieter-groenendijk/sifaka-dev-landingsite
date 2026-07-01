from alpine:3.24.1 as os

# Update package indexes and upgrade packages (for security updates)
run <<EOF
    apk update
    apk upgrade
EOF

# Install required OS applications 
run <<EOF
    apk add npm=11.17.0-r0
EOF

# Prepare directory
run mkdir --parents /srv/app
workdir /svr/app
copy app . 
run npm install


from os as dev

cmd npm run dev


# Currently unused since it goes through Cloudflare Pages
from os as prod




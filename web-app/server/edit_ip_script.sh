#!/bin/bash
strapi_file="../../web-app/client/src/utils/constants/strapi.ts"
app_file="../../app/App.js"
constants_file="../../web-admin/client/src/assets/enum/constants.js"

# Lấy địa chỉ IP của máy tính
ip_address=$(ifconfig | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | head -n 1)

if [ -n "$ip_address" ]; then
    echo "Địa chỉ IP hiện tại: $ip_address"

    # Sửa file Constants.java với địa chỉ IP
    sed -i "" "s#\(const IP = \)\'[0-9.]*';#\1\'${ip_address}';#" $strapi_file
    echo "Địa chỉ IP đã được cập nhật trong $strapi_file"

    sed -i "" "s#\(const IP = \)\'[0-9.]*';#\1\'${ip_address}';#" $app_file
    echo "Địa chỉ IP đã được cập nhật trong $app_file"

    sed -i "" "s#\(const IP = \)\'[0-9.]*';#\1\'${ip_address}';#" $constants_file
    echo "Địa chỉ IP đã được cập nhật trong $constants_file"
else
    echo "Không thể tìm thấy địa chỉ IP."
fi

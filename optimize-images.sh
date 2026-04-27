#!/bin/bash

# Image optimization script for Through the Gate
# Reduces image sizes to max 1MB while maintaining quality

echo "Starting image optimization..."

# Create optimized directory
mkdir -p Photos-optimized

# Function to optimize a single image
optimize_image() {
    input_file="$1"
    relative_path="${input_file#Photos/}"
    output_file="Photos-optimized/$relative_path"
    output_dir=$(dirname "$output_file")

    # Create directory structure
    mkdir -p "$output_dir"

    # Get original size
    original_size=$(ls -lh "$input_file" | awk '{print $5}')

    echo "Optimizing: $input_file ($original_size)"

    # Use sips to resize and compress
    # Target: max width 2000px, quality 85%, progressive JPEG
    sips -Z 2000 \
         --setProperty formatOptions 85 \
         "$input_file" \
         --out "$output_file" > /dev/null 2>&1

    # Check if output is still too large (>1MB), reduce further
    output_size_bytes=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)
    max_size=$((1024 * 1024))  # 1MB in bytes

    if [ $output_size_bytes -gt $max_size ]; then
        echo "  Still too large, reducing to max width 1600px..."
        sips -Z 1600 \
             --setProperty formatOptions 80 \
             "$input_file" \
             --out "$output_file" > /dev/null 2>&1
    fi

    new_size=$(ls -lh "$output_file" | awk '{print $5}')
    echo "  ✓ Optimized: $original_size → $new_size"
}

# Find and optimize all images
find Photos -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.JPG" \) | while read file; do
    if [[ ! "$file" =~ ".DS_Store" ]]; then
        optimize_image "$file"
    fi
done

echo ""
echo "Optimization complete!"
echo "Optimized images are in: Photos-optimized/"
echo ""
echo "To use optimized images, run:"
echo "  rm -rf Photos && mv Photos-optimized Photos"

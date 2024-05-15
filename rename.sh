for file in ./content/*.mdoc
do
  mv "$file" "${file%.mdoc}.md"
done

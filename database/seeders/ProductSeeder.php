<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            "sunglasses" => [
                'data' => [
                    'title' => 'Sunglasses',
                    'category' => 'Accessories',
                    'price' => 2099,
                    'quantity' => 100,
                    'description' => 'Stylish sunglasses for a sunny day.',
                ],
                'assets' => [
                    'aviator-sunglasses-2592111_1280_image-by-sandeep-handa-from-pixabay.jpg',
                    'sunglasses-178151_1280image-by-pawet-ludzinski-from-pixabay.jpg'
                ],
            ],
            "parfum" => [
                'data' => [
                    'title' => 'Parfum',
                    'category' => 'Beauty',
                    'price' => 4999,
                    'quantity' => 50,
                    'description' => 'Luxury parfum with a floral scent.',
                ],
                'assets' => [
                    'fragonard-1007437_1280image-by-nathaly-durepaire-from-pixabay.jpg',
                    'image-by-u_3u3n7wt5sr-from-pixabay.jpg'
                ],
            ],
            "headphones" => [
                'data' => [
                    'title' => 'Headphones',
                    'category' => 'Electronics',
                    'price' => 12999,
                    'quantity' => 150,
                    'description' => 'Noise-cancelling over-ear headphones.',
                ],
                'assets' => [
                    'headphones-814055_1280image-by-stephanie-robertson-from-pixabay.jpg',
                    'image-by-dmitrijs-bojarovs-from-pixabay.jpg'
                ],
            ],
            "makeup" => [
                'data' => [
                    'title' => 'Makeup',
                    'category' => 'Beauty',
                    'price' => 1999,
                    'quantity' => 200,
                    'description' => 'Cosmetic makeup for all skin types.',
                ],
                'assets' => [
                    'image-by-aerngaoey-from-pixabay.jpg',
                    'image-by-kinkates-from-pixabay.jpg'
                ],
            ],
            "wrist_watch" => [
                'data' => [
                    'title' => 'Wrist Watch',
                    'category' => 'Accessories',
                    'price' => 14999,
                    'quantity' => 75,
                    'description' => 'Elegant wristwatch with stainless steel.',
                ],
                'assets' => [
                    'image-by-emamul-andalib-from-pixabay.jpg',
                    'image-by-pexels-from-pixabay.jpg'
                ],
            ],
            "coffee" => [
                'data' => [
                    'title' => 'Coffee',
                    'category' => 'Grocery',
                    'price' => 999,
                    'quantity' => 300,
                    'description' => 'Freshly brewed coffee beans for perfect aroma.',
                ],
                'assets' => [
                    'coffee-5568374-1280.jpg',
                    'image-by-emir-krasnic-from-pixabay.jpg'
                ],
            ],
            "lipstick" => [
                'data' => [
                    'title' => 'Lipstick',
                    'category' => 'Beauty',
                    'price' => 2499,
                    'quantity' => 150,
                    'description' => 'Long-lasting lipstick in various shades.',
                ],
                'assets' => [
                    'image-by-steve-jang-from-pixabay.jpg',
                    'lipstick-8587707_1280image-by-thao-tran-thi-thanh-from-pixabay.jpg'
                ],
            ],
            "microphone" => [
                'data' => [
                    'title' => 'Microphone',
                    'category' => 'Electronics',
                    'price' => 7999,
                    'quantity' => 120,
                    'description' => 'High-quality microphone for podcasting.',
                ],
                'assets' => [
                    'image-by-la88au88ra-from-pixabay.jpg',
                    'laptop-7978588_1280image-by-beauty_of_nature-from-pixabay.jpg'
                ],
            ],
            "washing_machine_liquid" => [
                'data' => [
                    'title' => 'Washing Machine Liquid',
                    'category' => 'Home',
                    'price' => 799,
                    'quantity' => 400,
                    'description' => 'Liquid detergent for laundry.',
                ],
                'assets' => [
                    'image-by-martins2018-from-pixabay.jpg',
                    'washing-machine-2668472_1280image-by-steve-buissinne-from-pixabay.jpg'
                ],
            ],
            "sneakers" => [
                'data' => [
                    'title' => 'Sneakers',
                    'category' => 'Footwear',
                    'price' => 5999,
                    'quantity' => 180,
                    'description' => 'Comfortable sneakers for everyday wear.',
                ],
                'assets' => [
                    'image-by-mohamed-marzuk-mohamed-ansari-from-pixabay.jpg',
                    'nike-5099507_1280image-by-grailify-from-pixabay.jpg'
                ],
            ],
            "men_classic_shoes" => [
                'data' => [
                    'title' => 'Men Classic Shoes',
                    'category' => 'Footwear',
                    'price' => 8999,
                    'quantity' => 60,
                    'description' => 'Classic leather shoes for men.',
                ],
                'assets' => [
                    'image-by-shawnlee2008-from-pixabay.jpg',
                    'oxford-shoes-6078993_1280image-by-mike-tyler-from-pixabay.jpg'
                ],
            ],
            "cupcake" => [
                'data' => [
                    'title' => 'Cupcake',
                    'category' => 'Food',
                    'price' => 299,
                    'quantity' => 500,
                    'description' => 'Delicious and sweet cupcake in various flavors.',
                ],
                'assets' => [
                    'image-by-fancycrave1-from-pixabay.jpg',
                    'image-by-stocksnap-from-pixabay.jpg'
                ],
            ],
        ];

        foreach ($products as $product) {
            $productData = $product['data'];
            $productMedia = $product['assets'];

            $createdProduct = Product::updateOrCreate([
                'title' => $productData['title'],
                'category' => $productData['category'],
                'price' => $productData['price'],
                'quantity' => $productData['quantity'],
                'description' => $productData['description'],
            ]);

            foreach ($productMedia as $image) {
                $imagePath = public_path('images') . DIRECTORY_SEPARATOR . $image;
                $createdProduct->addMedia($imagePath)
                    ->sanitizingFileName(function ($fileName) {
                        return strtolower(str_replace(['#', '/', '\\', ' '], '-', $fileName));
                    })
                    ->preservingOriginal()
                    ->toMediaCollection(Product::PRODUCT_IMAGES);
            }
        }
    }
}

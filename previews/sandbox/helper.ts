import { ProductPreview, Image, Constants, Product } from "@src/Core";

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const productPreviews: ProductPreview[] = [
    new ProductPreview(
        1,
        "Sunglasses",
        "Accessories",
        20.99,
        Constants.HOST +
            "/media/1/conversions/aviator-sunglasses-2592111_1280_image-by-sandeep-handa-from-pixabay-thumbnail.jpg"
    ),
    new ProductPreview(
        2,
        "Parfum",
        "Beauty",
        49.99,
        Constants.HOST +
            "/media/3/conversions/fragonard-1007437_1280image-by-nathaly-durepaire-from-pixabay-thumbnail.jpg"
    ),
    new ProductPreview(
        3,
        "Headphones",
        "Electronics",
        129.99,
        Constants.HOST +
            "/media/5/conversions/headphones-814055_1280image-by-stephanie-robertson-from-pixabay-thumbnail.jpg"
    ),
    new ProductPreview(
        4,
        "Makeup",
        "Beauty",
        19.99,
        Constants.HOST +
            "/media/7/conversions/image-by-aerngaoey-from-pixabay-thumbnail.jpg"
    ),
    new ProductPreview(
        5,
        "Wrist Watch",
        "Accessories",
        149.99,
        Constants.HOST +
            "/media/9/conversions/image-by-emamul-andalib-from-pixabay-thumbnail.jpg"
    ),
    new ProductPreview(
        6,
        "Coffee",
        "Grocery",
        9.99,
        Constants.HOST +
            "/media/11/conversions/coffee-5568374-1280-thumbnail.jpg"
    ),
    new ProductPreview(
        7,
        "Lipstick",
        "Beauty",
        24.99,
        Constants.HOST +
            "/media/13/conversions/image-by-steve-jang-from-pixabay-thumbnail.jpg"
    ),
    new ProductPreview(
        8,
        "Microphone",
        "Electronics",
        79.99,
        Constants.HOST +
            "/media/15/conversions/image-by-la88au88ra-from-pixabay-thumbnail.jpg"
    ),
    new ProductPreview(
        9,
        "Washing Machine Liquid",
        "Home",
        7.99,
        Constants.HOST +
            "/media/17/conversions/image-by-martins2018-from-pixabay-thumbnail.jpg"
    ),
];

export const productSunglasses = new Product(
    1,
    "Sunglasses",
    "Accessories",
    20.99,
    100,
    "Stylish sunglasses for a sunny day.",
    [
        new Image(
            "9837ee14-758a-4052-97cd-83c9ee4c2fdc",
            "aviator-sunglasses-2592111_1280_image-by-sandeep-handa-from-pixabay.jpg",
            Constants.HOST +
                "/media/1/conversions/aviator-sunglasses-2592111_1280_image-by-sandeep-handa-from-pixabay-thumbnail.jpg",
            Constants.HOST +
                "/media/1/aviator-sunglasses-2592111_1280_image-by-sandeep-handa-from-pixabay.jpg"
        ),
        new Image(
            "48423fd0-5b18-4604-846f-3c9e72d19056",
            "sunglasses-178151_1280image-by-pawet-ludzinski-from-pixabay.jpg",
            Constants.HOST +
                "/media/2/conversions/sunglasses-178151_1280image-by-pawet-ludzinski-from-pixabay-thumbnail.jpg",
            Constants.HOST +
                "/media/2/sunglasses-178151_1280image-by-pawet-ludzinski-from-pixabay.jpg"
        ),
    ]
);

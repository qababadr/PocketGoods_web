<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    public const PRODUCT_IMAGES = 'product_images';
    public const MEDIA_CONVERSION = 'thumbnail';

    protected $fillable = [
        'title',
        'category',
        'price',
        'quantity',
        'description'
    ];

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion(self::MEDIA_CONVERSION)
            ->fit(Fit::Crop, 450, 400)
            ->nonQueued();
    }

    public function productImages()
    {
        $data = [];

        foreach ($this->getMedia(self::PRODUCT_IMAGES) as $media) {
            $data[] = [
                "uuid" => $media->uuid,
                "filename" => $media->file_name,
                "preview" => $media->getUrl(self::MEDIA_CONVERSION),
                "original" => $media->getUrl()
            ];
        }

        return $data;
    }

    public function thumbnail()
    {
        return $this->getMedia(self::PRODUCT_IMAGES)
            ->first()
            ?->getUrl(self::MEDIA_CONVERSION);
    }
}

<?php

namespace App\Controller\Products;
use App\Models\Products\Category;

class CategoriesController extends Category 
{
    public function getClothes($id)
    {
        return $this->clothes($id);
    }
}
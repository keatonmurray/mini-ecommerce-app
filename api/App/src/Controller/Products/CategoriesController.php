<?php

namespace App\Controller\Products;
use App\Models\Products\Category;

class CategoriesController extends Category 
{

    public function getAllCategories()
    {
        return $this->allCategories();
    }

    public function getCategory($id)
    {
        return $this->category($id);
    }
}
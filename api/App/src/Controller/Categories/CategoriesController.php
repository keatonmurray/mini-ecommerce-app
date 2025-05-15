<?php

namespace App\Controller\Categories;
use App\Models\Categories\Category;

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
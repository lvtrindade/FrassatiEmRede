<?php
namespace App\Services;

use App\Repositories\TagRepository;

class TagService {
    private $repo;

    public function __construct() {
        $this->repo = new TagRepository();
    }

    public function listarTodas() {
        return $this->repo->getAll();
    }
}
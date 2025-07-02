<?php
namespace App\Services;

use Exception;

use App\Repositories\BackgroundRepository;

class BackgroundService {
    private $repo;

    public function __construct() {
        $this->repo = new BackgroundRepository;
    }

    public function salvarImagemBase64($imagemBase64) {
        if (!$this->isValidBase64($imagemBase64)) {
            throw new Exception("Imagem inválida");
        }

        $imagemExistente = $this->repo->buscarPorId(2);

        if ($imagemExistente) {
            $this->repo->atualizarImagem(2, $imagemBase64);
        } else {
            $this->repo->inserirImagemComId(2, $imagemBase64);
        }

        return $this->repo->buscarPorId(2);
    }

    public function obterImagemDeFundo() {
        $imagemCustom = $this->repo->buscarPorId(2);
        return $imagemCustom ?? $this->repo->buscarPorId(1);
    }

    private function isValidBase64 ($str) {
        return base64_encode(base64_decode($str, true)) === $str;
    }
}
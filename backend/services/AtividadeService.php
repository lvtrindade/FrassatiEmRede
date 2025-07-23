<?php
namespace App\Services;

use Exception;
use App\Repositories\AtividadeRepository;

class AtividadeService {
    private $repo;

    public function __construct() {
        $this->repo = new AtividadeRepository();
    }

    public function listarTodas() {
        return $this->repo->getAll();
    }

    public function buscarPorId($id) {
        return $this->repo->findById($id);
    }

    public function criar($dto) {
        if (!$dto->isValid('criar')) {
            throw new \Exception("Dados inválidos (criar)");
        }

        $idAtividade = $this->repo->create($dto);
        $this->repo->criarGaleriaParaAtividade($idAtividade);

        return $this->repo->findById($idAtividade);
    }

    public function editar($id, $dto) {
        if (!$dto->isValid('editar')) {
            throw new \Exception("Dados inválidos (editar)");
        }

        $this->repo->update($id, $dto);
        return $this->repo->findById($id);
    }

    public function excluir($id) {
        return $this->repo->delete($id);
    }
}

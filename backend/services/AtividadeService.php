<?php
namespace App\Services;

<<<<<<< HEAD
=======
use Exception;
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
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
<<<<<<< HEAD
        if (!$dto->isValid()) {
            throw new Exception ("Dados inválidos");
        }
        $idAtividade = $this->repo->create($dto);

=======
        if (!$dto->isValid('criar')) {
            throw new \Exception("Dados inválidos (criar)");
        }

        $idAtividade = $this->repo->create($dto);
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
        $this->repo->criarGaleriaParaAtividade($idAtividade);

        return $this->repo->findById($idAtividade);
    }

    public function editar($id, $dto) {
<<<<<<< HEAD
        if (!$dto->isValid()) {
            throw new Exception("Dados Inválidos");
=======
        if (!$dto->isValid('editar')) {
            throw new \Exception("Dados inválidos (editar)");
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
        }

        $this->repo->update($id, $dto);
        return $this->repo->findById($id);
    }

    public function excluir($id) {
        return $this->repo->delete($id);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

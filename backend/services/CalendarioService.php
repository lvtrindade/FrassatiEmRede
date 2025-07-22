<?php
namespace App\Services;

<<<<<<< HEAD
=======
use Exception;

>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
use App\Repositories\CalendarioRepository;

class CalendarioService {
    private $repo;

    public function __construct() {
        $this->repo = new CalendarioRepository();
    }

    public function listarTodos() {
        return $this->repo->getAll();
    }

    public function buscarPorId($id) {
        return $this->repo->findById($id);
    }

    public function criar($dto) {
<<<<<<< HEAD
        if (!dto->isValid()) {
=======
        if (!$dto->isValid()) {
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
            throw new Exception ("Dados inválidos");
        }
        $idEvento = $this->repo->create($dto);
    
        return $this->repo->findById($idEvento);
    }

    public function editar($id, $dto) {
        if (!$dto->isValid()) {
            throw new Exception("Dados Inválidos");
        }

        $this->repo->update($id, $dto);
        return $this->repo->findById($id);
    }

    public function excluir($id) {
        return $this->repo->delete($id);
    }
}
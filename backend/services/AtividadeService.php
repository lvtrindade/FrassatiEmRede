<?php
require_once 'repositories/AtividadesRepository.php';

class AtividadeService {
    private $repo;

    public function __construct() {
        $this->repo = new AtividadeRespository();
    }

    public function listarTodas() {
        return $this->repo->getAll();
    }

    public function buscarPorId($id) {
        return $this->repo->findById($id);
    }

    public function criar($dto) {
        if (!$dto->isValid()) {
            throw new Exception ("Dados inválidos");
        }
        $idAtividade = $this->repo->create($dto);

        $this->repo->criarGaleriaParaAtividade($idAtividade);

        return $this->repo->findById($idAtividade);
    }

    public function editar($id, $dto) {
        if (!$dto->isValid()) {
            throw new Exception("Dados Inválidos");
        }

        $this->repo->update($id, $dto);
        return $this->repo->delete($id);
    }

    public function excluir($id) {
        return $this->repo->delete($id);
    }
}
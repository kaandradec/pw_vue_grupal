package uce.edu.web.repository;

import uce.edu.web.repository.modelo.Cliente;

import java.util.List;

public interface IClienteRepo {

    public Cliente buscarPorId(Integer id);
    public List<Cliente> obtenerTodos();
    public void insertar(Cliente cliente);
    public void actualizar(Cliente cliente);
    public void actualizarParcial(Cliente cliente);
    public void eliminar(Integer id);
}

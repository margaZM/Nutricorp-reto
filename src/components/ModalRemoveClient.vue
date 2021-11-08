<template>
    <div class="modal-container">
        <div class="modal-content">
        <p>Se removerá un ítem de tu  lista de clientes</p>
        <button class="accept-btn">ACEPTAR</button>
        <button class="cancel-btn">CANCELAR</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalRemoveClient',
}
</script>

<style>
.modal-container {
    height: 182px;
    width: 300px;
    left: 0px;
    top: 0px;
    border-radius: 5px;
    border: 1px solid var(--color-primary);
}
.modal-content {
    display: flex;
    flex-direction: column;
    padding: 24px 26px 24px 26px;
}
.modal-content p {
    font-weight: 500;
    font-size: 16px;
    line-height: 18,96px;
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
}
.accept-btn {
    height: 40px;
    border-radius: 40px;
    border: none;
    background-color: var(--color-primary);
    color: white;
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    margin-bottom: 10px;
    cursor: pointer;
}

.cancel-btn {
    border: none;
    background: none;
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    cursor: pointer;
}

</style>
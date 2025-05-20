type NotificationType = 'success' | 'error' | 'info' | 'warning';

export const showNotification = (message: string, type: NotificationType = 'info') => {
    // Por ahora solo mostraremos un console.log, pero aquí puedes integrar
    // cualquier librería de notificaciones que prefieras
    console.log(`[${type.toUpperCase()}]: ${message}`);
    // También puedes usar alert() temporalmente
    alert(message);
};
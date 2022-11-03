import useApp from '@/hooks/useApp';
import '@/styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
    const { init } = useApp();
    init();
});

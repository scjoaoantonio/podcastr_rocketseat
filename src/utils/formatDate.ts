import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(date) {
    return format(date, 'EEEEEE, d MMMM', { locale: ptBR });
}

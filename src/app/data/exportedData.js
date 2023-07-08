
import dataMayores from '../data/arcanos-mayores.json';
import dataMenores from '../data/arcanos-menores.json';

const MAYORES = dataMayores.Arcanos.map(arcano => ({
  nombre: arcano.nombre,
  normal: arcano.normal,
  invertida: arcano.invertida
}));
const MENORES = Object.keys(dataMenores).map(key => ({
  nombre: dataMenores[key].nombre,
  normal: dataMenores[key].normal,
  invertida: dataMenores[key].invertida
}));



let ARCANOS = { ...MAYORES, ...MENORES };

export default ARCANOS




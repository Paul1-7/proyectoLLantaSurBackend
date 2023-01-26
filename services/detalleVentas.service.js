const sequelize = require('../libs/sequelize.js')
const { models } = require('../libs/sequelize.js')

async function addSellDetail(data) {
  return await models.Detalle_Ventas.bulkCreate(data)
}

async function removeSellDetail(idSucProd) {
  return await models.Detalle_Ventas.destroy({
    where: {
      idSucProd: { [Op.in]: idSucProd }
    }
  })
}

async function updateSellDetail(idSucProd, data) {
  const removed = await removeSellDetail(idSucProd)
  const result =
    removed > 0 ? await models.Detalle_Ventas.bulkCreate(data) : null
  return result
}
async function getBestSellingProductsService({ start, end }) {
  const query =
    !start && !end
      ? 'select dv.id_prod as id,p.nombre,p.imagen,p.precio_venta as "precioVenta", c.nombre as categoria,m.nombre as marca, pr.nombre as proveedor,  SUM(dv.cantidad) as "cantidadVendida" from "Detalle_Ventas" as dv, "Productos" as p, "Categorias" as c, "Marcas" as m, "Proveedores" as pr where p.id = dv.id_prod and p.id_cat= c.id and p.id_marca= m.id and p.id_prov = pr.id  GROUP BY id_prod,p.nombre,c.nombre, m.nombre, pr.nombre, p.imagen,p.precio_venta ORDER BY "cantidadVendida" DESC;'
      : `select dv.id_prod as id,p.nombre, p.imagen,p.precio_venta as "precioVenta",c.nombre as categoria,m.nombre as marca, pr.nombre as proveedor, v.fecha, SUM(dv.cantidad) as "cantidadVendida" from "Detalle_Ventas" as dv, "Productos" as p, "Categorias" as c, "Marcas" as m, "Proveedores" as pr, "Ventas" as v where p.id = dv.id_prod and p.id_cat= c.id and p.id_marca= m.id and p.id_prov = pr.id and v.id= dv.id_venta and  v.fecha between '${start}' and '${end}' GROUP BY id_prod,p.nombre,c.nombre, m.nombre, pr.nombre, v.fecha, p.imagen,p.precio_venta ORDER BY "cantidadVendida" DESC;`

  return await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT
  })
}
module.exports = {
  addSellDetail,
  removeSellDetail,
  updateSellDetail,
  getBestSellingProductsService
}

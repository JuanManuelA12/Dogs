import React from 'react'
import "./Paginacion.css"

const Paginacion = ({ itemsPorPag, totalPosts, paginate }) => {
  const pageNumbers = [];
  const division = Math.ceil(totalPosts / itemsPorPag)  //8 dogs / 4 = 2paginas
  for (let i = 0; i < division; i++) {
    pageNumbers.push(i+1);
  }

  return (
    <div>
      <div className= "div-paginador">
        {pageNumbers.map(function (number) {
            return (
              <div>
                <button className="boton-paginador" onClick={() => paginate(number)}>
                  {number}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paginacion;
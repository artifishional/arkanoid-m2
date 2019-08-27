


export default ( { obtain, kind, player } ) => {

  if(kind === "ship") {

    //здесь требуется стрим контроллера джойстика
    //но он сильно завязан на тех данных, которые идут от соседних узлов
    //либо это `голые` события которые должны быть предварительно превращены в
    //state full поток

    return obtain("@ups")
      .withlatest([obtain("@units"), obtain("@controller", { id: player })], (_, [units]) => {

        units;

        console.log(units);

        return {};

      })
  }
  throw "unsupported actor model kind";



}
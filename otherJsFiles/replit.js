let cc = console.log



function persistence( num ) {
  //conver => arr
  let numArr = num.toString().split( '' );

  if ( numArr.length > 1 ) {
    let product = 1
    for ( let i = 0; i < numArr.length; i++ ) {
      product *= Number( numArr[ i ] )
    }
    //
    return 1 + persistence( product )
  } else {
    return 0
  }
}
cc(persistence(3422))//6
cc(persistence(39)) //4
cc(persistence(999))//2
cc(persistence(4))//4



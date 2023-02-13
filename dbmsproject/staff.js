
var products = [
    {
        CustomerName: "Anurag Karki",
        HouseAddress: "VMS ABAC",
        PhoneNumber: "083372923",
        SitterName: "Sitter1",
        Date: "01-03-2023",
        Time: "12:00pm",
        Service: "PetSitting"
    },
]
// This function will pick the value from the <selet>
// and add to the table
function addToTable() {
    let newname= (document.getElementById("exampleFormControlInput1")).value
    console.log(newname)

    let newproducts = {
        CustomerName: $('#exampleFormControlInput1').val(),
        HouseAddress: $('#exampleFormControlInput2').val(),
        PhoneNumber: $('#exampleFormControlInput3').val(),
        SitterName: $('#exampleFormControlInput4').val(),
        Date: $('#exampleFormControlInput5').val(),
        Time: $('#exampleFormControlInput6').val(),
        Service: $('#exampleFormControlInput7').val(),
        }

    products.push(newproducts)
    console.log(products)

    let newData =  `<tr>
    <td><img style="width: 0.5px; height: 0.5px;" src='icon-delete.png" onclick='deleteProduct("${(products.length)-1}")'>${newproducts.name}</td>
    </tr>`

    $("#productBody tr:last").after(newData)
    $('#exampleModal').modal('hide');
    loadData()
   

}
    
// Clear existing items in the table
function clearAll() {
    products = []
    $("#productBody").empty();
    loadData()
    $('#productBody').html("")
    
}

// TODO Should use product ID instead of name
function deleteProduct(index) {
    console.log("DELETE",index)
    if(products[index].quantity > 1){
        products[index].quantity --;
    }else{
        products.splice(index,1);  // remove the element from array
    }
    $('#productBody').html("")
    loadData()
}

function loadData() {
    let allRows = "";
    for (let p in products) {
        let cellname = `<td><img class='icon' src='icon-delete.png' style="width: 25px; height: 30px;"  onclick='deleteProduct(${p})'> ` + products[p].CustomerName + "</td>";
        let celladdress = '<td class="text-right">' + products[p].HouseAddress + "</td>";
        let cellnumber = '<td class="text-right">' + products[p].PhoneNumber + "</td>";
        let cellsittername = '<td class="text-right">' + products[p].SitterName + "</td>";
        let celldate = '<td class="text-right">' + products[p].Date + "</td>";
        let celltime = '<td class="text-right">' + products[p].Time + "</td>";
        let cellService = '<td class="text-right">' + products[p].Service + "</td>";
        let row = `<tr>${cellname}${celladdress}${cellnumber}${cellsittername}${celldate}${celltime}${cellService}<td class="text-right"></td></tr>`;
        allRows += row;
    }
    $('#productBody').html(allRows);
}


function loadDataOld() {

    // $('#productBody').html('<tr><td>xxx</td><td>xxx</td><td>xxx</td><td>xxx</td></tr>')
    
    let productList = document.getElementById("productList")
    for (let p in products) {
        let row = document.createElement("tr")
        let CustomerName = document.createElement("td")
        CustomerName.innerHTML = products[p].CustomerName

        let  = document.createElement("td")
        quantity.innerHTML = products[p].quantity
        quantity.classList.add("text-right")

        let ppu = document.createElement("td")
        ppu.innerHTML = products[p].ppu
        ppu.classList.add("text-right")


        row.appendChild(productName)
        row.appendChild(quantity)
        row.appendChild(ppu)
        row.appendChild(total)
        productList.appendChild(row)
    }

}





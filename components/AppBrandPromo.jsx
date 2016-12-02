// AppRoot.jsx
import React from 'react';
import ListStore from '../stores/ListStoreBrandPromo';
import AppDispatcher from '../dispatcher/AppDispatcherBrandPromo';

// Sub components
import NewItemForm from './NewItemForm';

//ВЫВЕСТИ КАК ОТДЕЛЬНЫЙ КОМПОНЕНТ
class SomeSum extends React.Component{
	
	
	  render() {
		  //to do - сюда таскать значение из резалт-таблицы
		   if(this.props.priceinrow){ 
			/*  alert(this.props.priceinrow); */
				return <div className="price_sell">{this.props.priceinrow}</div>;
		   }
		   return <span></span>;
	  }
}
//ВЫВЕСТИ КАК ОТДЕЛЬНЫЙ КОМПОНЕНТ
class ProductSelect extends React.Component {


    constructor(props, context) {
        super(props, context)
        this.state = {
			/* 	value: 1 */
        }
    }


    render() {
        var arrOfOptions = [];
        var setChecked = false;
        this.props.category.map(function (currOption, index) {
        	if(currOption.valOf=='checked'){
        		setChecked=currOption.strInfo;
        	} else {
                if(currOption.valOf == setChecked){
                    arrOfOptions.push(<option key={index} value={currOption.valOf} selected="selected">{currOption.strInfo}</option>);
                } else {
                    arrOfOptions.push(<option key={index} value={currOption.valOf}>{currOption.strInfo}</option>);
                }
			}


        });
        return <div><select onChange={this.props.onChange} value={this.state.value} data-id={this.props.unic}>{arrOfOptions}</select></div>;
        //return <div><select onChange={this.props.onClick} value={this.state.value}>{arrOfOptions}</select></div>;

    }
}

// Method to retrieve state from Stores
let getListState = () => {
  return {
    items: ListStore.getItems()
  };
}
//////////////////////////////////////
// блок данных вводимых пользователем
let getDistributorQuantiy = () => {
	return {
        distributorQuantiy: ListStore.inStore_getDistributorQuantiy()
	}
}


//////////////////////
// блок выходного чека
//Разработка программы
let getBillDev = () => {
    return {
        billDev: ListStore.inStore_getBillDev()
    }
}
//Платформа для Программы лояльности
let getBillPlatform= () => {
    return {
        billPlatform:ListStore.inStore_getBillPlatform()
    }
}

//Дизайн key visual
let getBillDesign= () => {
    return {
        billDesign:ListStore.inStore_getBillDesign()
    }
}

//Призовой фонд
let getBillBonus = () => {
    return {
        billBonus:ListStore.inStore_getBillBonus()
    }
}

//Охват (количество участников)
let getUsersQuantity= () => {
    return {
        usersQuantity:ListStore.inStore_getUsersQuantity()
    }
}

//Качество контакта
let getQualityLevel= () => {
    return {
        qualityLevel:ListStore.inStore_getQualityLevel()
    }
}

//Среднее количество контактов за Программу
let getContactsQuantity= () => {
    return {
        contactsQuantity:ListStore.inStore_getContactsQuantity()
    }
}


let getAllSum = () => {
	return {
        allAmount:ListStore.getSum()
	}
}
// блок выходного чека
//////////////////////







class AppBrandPromo extends React.Component {
  
  // Method to setState based upon Store changes
  _onChange() {
    this.setState(getListState());
//usercanchange
      this.setState(getDistributorQuantiy());
//usercantchange
    this.setState(getBillDev());
    this.setState(getBillPlatform());
    this.setState(getBillDesign());
    this.setState(getBillBonus());
    this.setState(getUsersQuantity());
    this.setState(getQualityLevel());
    this.setState(getContactsQuantity());

    this.setState(getAllSum());
  }

  constructor() {
    super();
    this.state = getListState();

//Данные о количестве дистрибьюторов
      this.state.distributorQuantiy = getDistributorQuantiy();






//Разработка программы
      this.state.billDev = getBillDev();

//Платформа для Программы лояльности
      this.state.billPlatform = getBillPlatform();

//Дизайн key visual
      this.state.billDesign = getBillDesign();

//Призовой фонд
      this.state.billBonus = getBillBonus();

//Охват (количество участников)
      this.state.usersQuantity = getUsersQuantity();

//Качество контакта
	  this.state.qualityLevel = getQualityLevel();

//Среднее количество контактов за Программу
      this.state.contactsQuantity = getContactsQuantity();


//Итого:
    this.state.allAmount = getAllSum();
	//this.handleClickCheckbox = this.handleClickCheckbox.bind(this) ;



  }

  // Add change listeners to stores
  componentDidMount() {
    ListStore.addChangeListener(this._onChange.bind(this));
  }

  // Remove change listeners from stores
  componentWillUnmount() {
    ListStore.removeChangeListener(this._onChange.bind(this));
  }

  setDistributorQuantiy(e){
	  alert("about");
  }

    changeValueBySelect(e){
        let id = e.target.dataset.id;
        let value = e.target.value;
        AppDispatcher.dispatch({
            action: 'change-value-by-id-select',
            valuebyidinselect: {
                id: id,
                value: value
            }
        });
	}
  changeValueInState(e){
  	//важно изменить через диспетчер в стейт придет само!
      let id = e.target.dataset.id;
		let value = e.target.value;
      AppDispatcher.dispatch({
          action: 'change-value-by-id',
          valuebyid: {
			  id: id,
			  value: value
		  }
      });
  }

    setBudget(e){
        let valuebudget = e.target.value;
        AppDispatcher.dispatch({
            action: 'set-budget',
            valuebudget: valuebudget
        });
	}


  addToSum(e){
	 //addSumItem
	  let id = e.target.dataset.id;
    
    AppDispatcher.dispatch({
      action: 'add-sum-item',
      id: id
    });
  }
  
  removeItem(e){

    let id = e.target.dataset.id;
    
    AppDispatcher.dispatch({
      action: 'remove-item',
      id: id
    });
  }

  render(){

    let _this = this;
	let lastCategory = '';
    let items = ListStore.getItems();
    //ОПРЕДЕЛЯЕМ нужен ли самостоятельный рассчет
	  var currentLocation = this.props.path.indexOf("self");

//Разработка программы
      let billDev = ListStore.inStore_getBillDev();

//Платформа для Программы лояльности
      let billPlatform = ListStore.inStore_getBillPlatform();

//Дизайн key visual
      let billDesign = ListStore.inStore_getBillDesign();

//Призовой фонд
      let billBonus = ListStore.inStore_getBillBonus();


      var arrSize = items.length;//ПОЛУЧАЕМ последнее занчение для вывода последнего блока ИТОГО (раздела "Призовой
	  // фонд")
	let itemHtml = items.map(( listItem,index ) => {

        var promopart = [];
        switch (listItem.category) {
            case "Пакет “А” Optimal online (B2B), 3 месяца":
                promopart.push('for first!<hr/>');
                break
            case "Пакет “B” Online + Ofline (B2B), 3 месяца":
                promopart.push('for 2!<hr/>');
                break
            case "Пакет “С” Online + Ofline VIP (B2B), 3 месяца":
                promopart.push('for 3!<hr/>');
                break
            case "Пакет ”С+” Online (B2B) MAX EFFECT (B2B+B2C), 3 месяца":
                promopart.push('for 4!<hr/>');
                break
        }




            return <div>
				<div>
					<div className="row bcwhite margintop10">
						<div className="col-md-12 blueColor_h80_pt5">
							<h3>{listItem.category}</h3>
						</div>
					</div>
				</div>

<div>
	{promopart}
</div>

				<div className="row grayinrow">
					<div className="col-md-7">*Призовой фонд
						(включая налоги (для РФ при условии, что фактическая стоимость поощрения не превышает 3500 руб.), комиссию агентства, юридическое и бухгалтерское сопровождение)</div>
					<div className="col-md-2 itogo">ИТОГО:</div><div className="col-md-3 itogo_sell">{listItem.price} €</div>
				</div>

				<div className="row grayinrow">
					<div className="col-md-12">
						<div className="width120-center">
							<button className='checkboxforprice btn btn-primary'  onClick={ _this.addToSum } data-id={ listItem.id } id={listItem.unicname}  value={listItem.price} checked={listItem.ischecked}>ДОБАВИТЬ В КОРЗИНУ</button>
						</div>
					</div>
				</div>

			</div>;


    });
		 // <button onClick={ _this.removeItem } data-id={ listItem.id }>×</button>

   /* return (
      <div>
        <div className="allControls">
          { itemHtml }
        </div>
        <NewItemForm />
      </div>
    );*/

      return (
	  <div  className="row" key="mainform" id="reactroot">
		  <div className="col-md-8">{itemHtml}</div>
		  <div className="col-md-4">
			  <div id="staticPriceBrandPromo">

				  <div className="row">
					  <div className="col-md-9 colorblue">Результаты</div>

				  </div>



				  <div className="row">
					  <div className="col-md-9">Пакет “А” Optimal online (B2B), 3 месяца</div>
					  <div className="col-md-3">{this.state.billDev} €</div>
				  </div>

				  <div className="row">
					  <div className="col-md-9">Пакет “B” Online + Ofline (B2B), 3 месяца</div>
					  <div className="col-md-3">{this.state.billPlatform} €</div>
				  </div>

				  <div className="row">
					  <div className="col-md-9">Пакет “С” Online + Ofline VIP (B2B), 3 месяца</div>
					  <div className="col-md-3">{this.state.billDesign} €</div>
				  </div>

				  <div className="row">
					  <div className="col-md-9">Пакет ”С+” Online (B2B) MAX EFFECT (B2B+B2C), 3 месяца</div>
					  <div className="col-md-3">{this.state.billBonus} €</div>
				  </div>

				  <hr/>
				  <div className="row colorblue">
					  <div className="col-md-9"><span className="textalignright">Итого:</span></div>
					  <div className="col-md-3">{this.state.allAmount} €</div>
				  </div>

			  </div>

		  </div>
	  </div>);
  }
 //////////////////////////////
 // block of my functions
 
 handleClickCheckbox(someval,indexinarray) {
		//alert(this.state.resultPrices[indexinarray].needit == false);
		/* if(this.state.resultPrices[indexinarray].needit == false && this.state.resultPrices[indexinarray].ischecked == false) {
			var newArr = this.state.resultPrices;
	
			newArr[indexinarray].price = someval;
			newArr[indexinarray].needit = true;
			newArr[indexinarray].ischecked = true;
			this.setState({ resultPrices: newArr });

		} else {
			var newArr = this.state.resultPrices;
			newArr[indexinarray].needit = false;
			newArr[indexinarray].ischecked = false;
				
			this.setState({ resultPrices: newArr });

		}
			this.recountIt();*/
	}  
	
	setDistributorQuantiy(indexinarray,event){
		//alert('dis');
		/*   var valueForDistributorPrice = event.target.value;

		  var newArrForFormula = this.state.resultPrices;
		   newArrForFormula[indexinarray].multinumber = valueForDistributorPrice;
		   //alert(newArrForFormula[indexinarray].multinumber);//количество дистрибъюторов
		   
	   newArrForFormula.map(function(currentRow,index) {
			   if (currentRow.unicname == 'bonus_for_disr') {
                   console.log("valueForDistributorPrice="+valueForDistributorPrice);
				   //alert('about change');
				   newArrForFormula[index].multinumber = valueForDistributorPrice;
			   }
		   });
		  this.setState({ resultPrices: newArrForFormula });
		  
		  this.recountIt(); */
	}
	
		setBudgetInStateOnly(indexinarray,event){
			alert("budget");
		/*		  var valueForBudget = event.target.value;
		   	this.setState({ budget: valueForBudget });
		   	this.setState({ allAmount: 0 });
		   	this.setState({ billDev: 0 });
		   	this.setState({ billPlatform: 0 });
		   	this.setState({ billDesign: 0 });
		   	this.setState({ billBonus: 0 });

	 	participant:1600,
		coverage:"высокое",
		quanticont:1000,
		vinnerquantity:500, */
			
	}	
	
	setBannerQuantiy(indexinarray,event){
		alert("Banner");
/* 		 var valueForBannerQuantity = event.target.value;
		 var newArrForFormula = this.state.resultPrices;
		 newArrForFormula[indexinarray].multinumber = valueForBannerQuantity;
	 
		 newArrForFormula.map(function(currentRow,index) {
			   if (currentRow.unicname == 'price_for_banner') {
				   newArrForFormula[index].multinumber = valueForBannerQuantity;
			   }
		   });   
		  this.setState({ resultPrices: newArrForFormula });

		  this.recountIt(); */
	}
	
		setVinnerQuantiy(indexinarray,event){
					alert("Vinner");
		/* var valueForVinnerQuantity = event.target.value;
		var participantQuantity = valueForVinnerQuantity*3;
		this.setState({participant : participantQuantity});
		var newArrForFormula = this.state.resultPrices;
		newArrForFormula[indexinarray].multinumber = valueForVinnerQuantity;
		this.state.vinnerquantity = newArrForFormula[indexinarray].multinumber;
		  newArrForFormula.map(function(currentRow,index) {
			   if (currentRow.unicname == 'users_quantity') {
				   newArrForFormula[index].multinumber = participantQuantity;

			   }
		   }); 
		   
		   
		  this.setState({ resultPrices: newArrForFormula });

		  this.recountIt(); */
	}	
	
	 changeItemPriceMulti(indexinarray,event){
		 alert('Just multi');
		  /* var valueForMulti = event.target.value;
		  var newArrForFormula = this.state.resultPrices;
		  var basePrice = newArrForFormula[indexinarray].baseprice;
		  newArrForFormula[indexinarray].multinumber = valueForMulti;
		  newArrForFormula[indexinarray].price = parseInt(valueForMulti*basePrice);
		  this.setState({ resultPrices: newArrForFormula });
		  
		  this.recountIt(); */
	  }
		
  
}

export default AppBrandPromo;
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

// todo move this to shared location, or create model
class ItemsToShow {
    imageLocation?: string;
    displayName?: string;
}


interface IPropsCarousel {
    itemsToShow : ItemsToShow[]
}

interface IStateCarousel {
    slideToShow : number;
}

export class Carousel extends React.Component<IPropsCarousel, IStateCarousel> {

    constructor(props : any) {
        super(props);
        this.state = {
            slideToShow : 0
        };
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    render() {

        const slideToshow = this.state.slideToShow;

        return (
            <div>            
                <CarouselTabs
                    data={this.props.itemsToShow}
                    slideToShow = {slideToshow}
                    onSelectedTabChange={this.handleTabChange} />

                <CarouselBody
                    data={this.props.itemsToShow}
                    slideToShow ={slideToshow}
                    onShownSlideChange={this.handleTabChange}/>  
            </div>
        );

    }

    handleTabChange(slideChangedTo : number) {

        this.setState({ slideToShow: slideChangedTo });

    }

}

interface IPropsCarouselTabs {
    onSelectedTabChange(tabToChangeTo: number): void;
    slideToShow: number;
    data : ItemsToShow[];
}

interface IStateCarouselTabs {
    
}

class CarouselTabs extends React.Component< IPropsCarouselTabs, IStateCarouselTabs >
{
    constructor() {
        super();

        this.handleTabChange = this.handleTabChange.bind(this);
    }


    handleTabChange(index :number) {
        this.props.onSelectedTabChange(index);

    }

    // runs when component after item has been mounted/constructed/returned
    componentDidMount() {
        var index = this.props.slideToShow;
        this.props.onSelectedTabChange(index);
    }

    render() {
        const data = this.props.data;
        // todo toshowTimes cannot be duplicated/ list cannot change
        return(
            <ul className="nav nav-tabs" id="dashboardFeed">
              
                {data.map((item: ItemsToShow) => 

                    <li key={data.indexOf(item)} onClick={() => this.handleTabChange(data.indexOf(item))}>                        
                        {/*  <a data-toggle="tab" data-target="#myCarousel" data-slide-to={data.indexOf(item)} role="tab">{item.displayName} </a> */}
                        <a data-toggle="tab" role="tab">{item.displayName} </a>
                            
                    </li>

                )}
          
            </ul>  

        );
    }


}
interface IPropsCarouselBody {
    onShownSlideChange(tabToChangeTo: number): void;
    slideToShow: number;
    data: ItemsToShow[];
}

interface IStateCarouselBody {

}

class CarouselBody extends React.Component<IPropsCarouselBody, IStateCarouselBody> {
    constructor() {
        super();
       

    }

    componentDidMount() {
    }


    render() {
        const data = this.props.data;
        // todo toshowTimes cannot be duplicated/ list cannot change
        return (
            <div className="carousel slide" data-ride="carousel" data-interval="6000" id="myCarousel">
                <div className="carousel-inner">

                    {data.map((item: ItemsToShow) =>
                        <CarouselItem
                            data={item}
                            slideToShow={this.props.slideToShow}
                            mySlide={data.indexOf(item)}
                            isActive={this.props.slideToShow === data.indexOf(item)}
                        />
                    )}

                </div>
            </div>
        );

    }
}


interface IPropsCarouselItem {

    data: ItemsToShow;
    slideToShow: number;
    mySlide : number;
    isActive: boolean;
}

interface IStateCarouselItem {

}

//https://stackoverflow.com/questions/35224113/react-change-class-name-on-state-change
class CarouselItem extends React.Component<IPropsCarouselItem, IStateCarouselItem> {
    constructor() {
        super();

    }

    render() {


        console.log(this.props.slideToShow);
        console.log(this.props.mySlide);

        return (
            <div className={this.props.isActive ? 'item active' : 'item'} >
                <img src={this.props.data.imageLocation} />
                </div>
            );


    }

}

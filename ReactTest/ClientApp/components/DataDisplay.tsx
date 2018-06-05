import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Carousel } from "./Carousel";


// defined interface for state and props due to typscript req it
interface IProps {
    addToPageList(id? : number, title? : string, capacity? : number, description?: string): void;
}

interface IState {
    id?: number; // each is '?' (optional) so we may change individual states in .setState()
    title?: string;
    capacity?: number;
    description?: string;
}


 class InputForm extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            // defining default values **must match the IState that is passed in**
            id: 0,
            title: '',
            capacity: 0,
            description : ''
        };

        // binding so that 'this' may be used in functions
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // when input is changed, state is changed
    handleInputChange(e: {target: any}) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name] : value
        });
    }

    handleSubmit(e: { preventDefault: () => void; }){
        e.preventDefault();
        fetch('api/SampleData/SubThat',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id : this.state.id,
                    Title: this.state.title,
                    Capacity: this.state.capacity,
                    Description: this.state.description,
                })
            });

        this.props.addToPageList(this.state.id,this.state.title,this.state.capacity,this.state.description); // adds item to the list on our page 
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    title
                <input type="text" value={this.state.title} name="title" onChange={this.handleInputChange} />
                </label>
                <input type="number" value={this.state.capacity} name="capacity" onChange={this.handleInputChange}/>
                <input type="text" value={this.state.description} name="description" onChange={this.handleInputChange}/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}



class DataObject {
    id?: number;
    title?: string;
    capacity?: number;
    description?: string;
}

interface IEventsState {
    items: DataObject[];
    loading?: boolean;
}

class ItemsToShow {
    imageLocation?: string;
    displayName?: string;
}

// export allow class to be used in other files
export class DataDisplay extends React.Component<RouteComponentProps<{}>, IEventsState> {
    constructor() {
        super();
        this.state = {
            items: [],
            loading: true
        };

        this.onSubmit = this.onSubmit.bind(this);

        fetch('api/SampleData/AllEvents')
            .then(response => response.json() as Promise<DataObject[]>)
            .then(data => {
                this.setState({ items: data, loading: false });
            });
    }

    public onSubmit(id?: number, title?: string, capacity?: number, description?: string) {
        var itemToAdd = new DataObject();

        itemToAdd.id = Date.now();
        itemToAdd.title = title;
        itemToAdd.capacity = capacity;
        itemToAdd.description = description;

        var oldlist = this.state.items;
        var newList = oldlist.concat(itemToAdd);

        this.setState({ items: newList });
    }
   
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : DataDisplay.renderTable(this.state.items);


/////////////////////////////////////////////////////////////////////////////

        var yeah = new ItemsToShow();
        yeah.displayName = "test";
        yeah.imageLocation = "https://webkit.org/demos/srcset/image-1x.png";

        var another = new ItemsToShow();
        another.displayName = "second";
        another.imageLocation = "https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg";
        const stuffToShow = [yeah,another];

/////////////////////////////////////////////////////////////////////////////

        return (<div>
                   <p>This component demonstrates fetching data from the server.</p>
            {contents}  

            <Carousel itemsToShow={stuffToShow} />

            <InputForm addToPageList={this.onSubmit}/>
        </div>
        
        );
    }

    private static renderTable(data: DataObject[]) {
        return <table className='table'>
                   <thead>
                   <tr>
                       <th>title</th>
                       <th>capacity</th>
                       <th>description</th>
                   </tr>
                   </thead>
                   <tbody>
                   {data.map(item =>
                    <tr key={item.id}>
                        <td>{item.title}</td>
                           <td>{item.capacity}</td>
                           <td>{item.description}</td>
                       </tr>
                   )}
                   </tbody>
        </table>;
    }
}

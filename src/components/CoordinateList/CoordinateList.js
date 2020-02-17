import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ClearIcon from '@material-ui/icons/Clear';
// import SettingsIcon from '@material-ui/icons/Settings';

import './CoordinateList.css';

class CoordinateList extends React.Component {
    render() {
        const coords = this.props.coords; 

		const listCoords = coords.map((coord) => 
			<ListGroup.Item key={coord.toString()} className="d-flex flex-row">
                <div className="vertical-center">
                    {coord.toString()}
                </div>
                <ButtonGroup className="ml-auto">
                    {/* <Button variant="outline-primary">
                        <SettingsIcon/>
                    </Button> */}
                    <Button 
                        variant="outline-danger" 
                        onClick={() => this.props.delCoord(coord.x, coord.y)}>
                        <ClearIcon/>
                    </Button>
                </ButtonGroup>
			</ListGroup.Item>
		);
        
        return (
            <div>
                <label>Coordinates</label>
                <ListGroup>
                    {listCoords}
                </ListGroup>
            </div>
        );
    }
}

export default CoordinateList;
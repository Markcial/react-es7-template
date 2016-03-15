// Filename: Grid.jsx
import React from 'react';

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

import {connect} from "react-redux";
import {Actions} from 'rx/reducers/ui';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    height: 500,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

class Grid extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    onItemSelected: React.PropTypes.func.isRequired
  }
  static defaultProps = {
    items: []
  }

  componentDidMount() {
    fetch('/www/data/shop.js')
      .then(r => r.json())
      .then(data => this.loadData(data))
  }

  loadData(data) {
    console.log(data);
    data.items.map((itm) => {
      this.props.items.push(itm);
      console.log(this.props);
    })
    this.forceUpdate();
  }

  render () {
    return <div style={styles.root}>
      <GridList
        cellHeight={200}
        cellWidth={300}
        cols={4}
        style={styles.gridList}
      >
     {this.props.items.map( (item) =>
       <GridTile
        key={item.id}
        title={item.name}
        subtitle={`${item.value} €`}
        actionIcon={<IconButton onClick={() => this.props.onItemSelected(item) }><StarBorder color="white"/></IconButton>}
      >
        <img src={item.img} />
      </GridTile>
      )}
      </GridList>
    </div>
  }
}

var mapDispatchToProps = function(dispatch){
	return {
		onItemSelected: function(item){
      dispatch({type: Actions.CART_ITEM_ADDED, item:item}, event);
    }
	}
};

export default connect((state) => state, mapDispatchToProps)(Grid);

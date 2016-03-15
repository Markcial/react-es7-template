// Filename: Cart.jsx
import React from 'react';

import Badge from 'material-ui/lib/badge';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';

import {connect} from "react-redux";
import {Actions} from 'rx/reducers/ui';

class CartMenu extends React.Component {

  state = {
    items: []
  }

  static propTypes = {
    items: React.PropTypes.array.isRequired
  }

  static defaultProps = {
    items: []
  }

  addItem(item) {
    let items = this.getState('items');
    items.push(item);
    this.setState({items:items});
  }

  getItemCount() {
    return this.props.items.length;
  }

  getTotalSpent() {
    let total = 0;
    this.props.items.map( (item) => total += item.value );
    return total.toFixed(2);
  }

  render() {
    const {items} = this.props;
    console.log(items);
    return <IconMenu
      iconButtonElement={
        <Badge
          badgeContent={this.getItemCount()}
          secondary={true}
          badgeStyle={{left:-8, top:-8,opacity:.6, background:"purple"}}
          style={{padding:0}}
         >
         <RaisedButton
           label={`Total: ${this.getTotalSpent()} €`}
           secondary={true}
           icon={<FontIcon className="material-icons">shopping_cart</FontIcon>}
         />
        </Badge>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {items.map ( (item) =>
          <MenuItem primaryText={item.name} />
        )}
    </IconMenu>
  }
}

var mapStateToProps = function(state){
	return {items:state.ui.items};
};

export default connect(mapStateToProps)(CartMenu);

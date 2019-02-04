import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';



const CustomTableCell = withStyles(style => ({
	head: {
		padding: "5px",
	},
}))(TableCell);


class EnhancedTableHead extends PureComponent {

	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	};
	
		render() {

			const { onDeSelectAllClick, order, orderBy, numSelected, displayCheckbox, rows, rowCount } = this.props;
	
			return (
				<TableHead>
					<TableRow>

						{displayCheckbox && <CustomTableCell padding="checkbox">
							{numSelected > 0 && 
								<Checkbox
									indeterminate={numSelected > 0 } 
									checked={false} 
									onChange={onDeSelectAllClick}
								/>
							}
						</CustomTableCell> }

						{rows.map(row => {
							return (
								<CustomTableCell
									key={row.id}
									padding={row.disablePadding ? 'none' : 'default'}
									sortDirection={orderBy === row.id ? order : false}
								>
									<Tooltip
										title="Sort"
										placement={row.numeric ? 'bottom-end' : 'bottom-start'}
										enterDelay={300}
									>
										<TableSortLabel
											active={orderBy === row.id}
											direction={order}
											onClick={this.createSortHandler(row.id)}
										>
											{row.label}
										</TableSortLabel>
									</Tooltip>
								</CustomTableCell>
							);
						}, this)}

					</TableRow>
				</TableHead>
			);
		}
	}
	
	EnhancedTableHead.propTypes = {
		numSelected: PropTypes.number.isRequired,
		onRequestSort: PropTypes.func.isRequired,
		order: PropTypes.string.isRequired,
		orderBy: PropTypes.string.isRequired,
		rowCount: PropTypes.number.isRequired,
	};

	export default EnhancedTableHead;
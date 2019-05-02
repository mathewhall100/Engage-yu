import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TableCell, TableHead, TableRow, TableSortLabel, Tooltip, Checkbox, Typography} from '@material-ui/core';


const CustomTableCell = withStyles(style => ({
	head: {
		padding: "5px",
	},
}))(TableCell);


class TableEnhancedTableHead extends PureComponent {

	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	};
	
		render() {
			const { onDeSelectAllClick, order, orderBy, numSelected, displayCheckbox, rows } = this.props;
	
			return (
				<TableHead>
					<TableRow>

						{displayCheckbox && <CustomTableCell padding="checkbox">
							{numSelected > 0 && 
								<Checkbox
									indeterminate={numSelected > 0 } 
									checked={false} 
									onChange={onDeSelectAllClick}
									style={{paddingLeft: 0}} 
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
											<Typography variant="subtitle2">{row.label}</Typography>
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
	
	TableEnhancedTableHead.propTypes = {
		numSelected: PropTypes.number.isRequired,
		onRequestSort: PropTypes.func.isRequired,
		onDeSelectAllClick: PropTypes.func.isRequired,
		order: PropTypes.string.isRequired,
		orderBy: PropTypes.string.isRequired,
		rows: PropTypes.array.isRequired,
		displayCheckbox: PropTypes.bool.isRequired,
	};

	export default TableEnhancedTableHead;
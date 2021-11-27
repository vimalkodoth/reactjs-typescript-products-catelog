import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TRows } from './App';
import Button from './Button';

type TAppProps = {
    headings: string[];
    rows: TRows[][];
};

const thHeadCSS = (isId: string) => css`
    display: ${isId === '_id' ? 'none' : 'table-cell'};
    padding: 8px;
`;

const tdRowsCSS = (index: number) => css`
    display: ${index === 0 ? 'none' : 'table-cell'};
    padding: 8px;
`;

const Table = ({ headings, rows }: TAppProps): JSX.Element => {
    return (
        <table>
            <thead>
                <tr>
                    {headings.map((heading) => {
                        return (
                            <th key={heading} css={thHeadCSS(heading)}>
                                {heading}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {rows.length ? (
                    rows.map((row) => {
                        return (
                            <tr key={row.join('-')}>
                                {row.map((item, i) => {
                                    const productId = row[0];
                                    return (
                                        <td
                                            key={item.toString()}
                                            css={tdRowsCSS(i)}
                                        >
                                            {headings[i] === 'isEditable' ? (
                                                <Link
                                                    to={`/edit-product/${productId}`}
                                                >
                                                    <Button title="Edit" />
                                                </Link>
                                            ) : (
                                                item.toString()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan={5}>Loading...</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;

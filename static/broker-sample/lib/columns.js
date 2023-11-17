export const ordersPageColumns = [
    {
        label: 'Symbol',
        formatter: 'symbol',
        property: 'symbol',
    },
    {
        label: 'Side',
        property: 'side',
        formatter: 'side',
    },
    {
        label: 'Type',
        property: 'type',
        formatter: 'type',
    },
    {
        label: 'Qty',
        alignment: 'right',
        property: 'qty',
        help: 'Size in lots',
    },
    {
        label: 'Limit Price',
        alignment: 'right',
        property: 'limitPrice',
        formatter: 'formatPrice',
    },
    {
        label: 'Stop Price',
        alignment: 'right',
        property: 'stopPrice',
        formatter: 'formatPrice',
    },
    {
        label: 'Last',
        alignment: 'right',
        property: 'last',
        formatter: 'formatPriceForexSup',
        highlightDiff: true,
    },
    {
        label: 'Execution',
        property: 'execution',
    },
    {
        label: 'Status',
        property: 'status',
        formatter: 'status',
        supportedStatusFilters: [0 /* OrderStatusFilter.All */],
    },
    {
        label: 'Order id',
        property: 'id',
    },
];
export const positionsPageColumns = [
    {
        label: 'Symbol',
        formatter: 'symbol',
        property: 'symbol',
    },
    {
        label: 'Side',
        property: 'side',
        formatter: 'side',
    },
    {
        label: 'Qty',
        alignment: 'right',
        property: 'qty',
        help: 'Size in lots',
    },
    {
        label: 'Avg Fill Price',
        alignment: 'right',
        property: 'avgPrice',
        formatter: 'formatPrice',
    },
    {
        label: 'Last',
        alignment: 'right',
        property: 'last',
        formatter: 'formatPriceForexSup',
        highlightDiff: true,
    },
    {
        label: 'Profit',
        alignment: 'right',
        property: 'pl',
        formatter: 'profit',
    },
];
export const accountSummaryColumns = [
    {
        label: 'Title',
        notSortable: true,
        property: 'title',
        formatter: 'custom_uppercase',
    },
    {
        label: 'Balance',
        alignment: 'right',
        property: 'balance',
        formatter: 'fixed',
    },
    {
        label: 'Open PL',
        alignment: 'right',
        property: 'pl',
        formatter: 'profit',
        notSortable: true,
    },
    {
        label: 'Equity',
        alignment: 'right',
        property: 'equity',
        formatter: 'fixed',
        notSortable: true,
    },
];

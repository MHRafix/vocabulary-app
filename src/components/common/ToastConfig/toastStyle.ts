export const successStyle = (theme: any) => ({
	root: {
		backgroundColor: theme.colors.teal[6],

		'&::before': { backgroundColor: theme.white },
	},

	title: { color: theme.white },
	description: { color: theme.white },
	closeButton: {
		color: theme.white,
		'&:hover': { backgroundColor: theme.colors.teal[7] },
	},
});

export const errorStyle = (theme: any) => ({
	root: {
		backgroundColor: theme.colors.red[6],

		'&::before': { backgroundColor: theme.red },
	},

	title: { color: theme.white },
	description: { color: theme.white },
	closeButton: {
		color: theme.white,
		'&:hover': { backgroundColor: theme.colors.red[7] },
	},
});

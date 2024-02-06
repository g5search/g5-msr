export default async function ({ store, route, error, redirect }) {
  if (route.path === '/') {
    return redirect('/edit')
  }
  if (route.path === '/edit') {
    await store.dispatch('user/setUser');
    const roles = store.state.user.user.roles;
    if (!roles || !roles.find(role => role.type === 'GLOBAL')) {
      error('No user set or user is not GLOBAL!');
    }
  }
}

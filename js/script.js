function show_hide_password()
{
	var input = document.getElementById('password_input');

    if (input.getAttribute('type') == 'password')
    {
        input.type = 'text';
    }
    else
    {
        input.type = 'password';
    }

	return false;
}
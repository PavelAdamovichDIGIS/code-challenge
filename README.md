# code-challenge
A code challenge used to assess developers knowledge and skills

### Scenario
A developer has tried to do a task that you must now take over and complete.

The task has been extended with additional requirements after the developer left.

OBS: The API mock must be used and it must not be changed.

### Requirements
- It must be possible to run the program and get back the colors green, blue and red in HEX format.
- It must be possible to define the colors using their names like red, blue and green.
- It must be possible to define the order the colors are returned.

### New additional requirements
- The program must support the colors white and black.
- The program must be able to return the RGB values.
- It must be possible to run the program asynchronously getting all the colors at the same time
- It must be possible to run the program synchronously getting one color a time

### Launch instructions
Launch command has been updated to more resemble the usual console application. Now instead of set of arguments in fixed order app uses flags, that can be listed in any order, added help command and simplified a way of providing order of colors. Instead of listing desired order in JSON format, user now can just list colors separating them with comma, app handles the rest.

There are two ways to start the app:
- `node <code_challenge_root>/src/index.js [...flags] color1,color2,...colorN`
- `npm start -- [...flags] color1,color2,...colorN`

List of available flags:
- `--help` - displays instruction in the terminal
- `--skip-red`, `--skip-green`, `--skip-blue`, `--skip-black`, `--skip-white` - used to remove specified color from output
- `--sync` - used to parse colors synchronously one by one, rather than all of them in parallel

List of available colors:
- `red`
- `green`
- `blue`
- `black`
- `white`

If you omit one or more colors from the colors order argument, default order listed above will be used instead.

In case of providing invalid flags or colors, app will show error message along with usage instructions
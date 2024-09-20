# @rbxts/expect

## TODO()

- Make a wiki like rLog
- Create a logo/npm description
- Evaluate how actual values are output. For example, strings should have quotes wrapped around them, but they don't. There may be other types like this
that are misrepresented. Looks like some roblox types (eg; cframe/vector3) come out as null too
- Check if any of the format placeholders are not being used and remove them.
- Cleanup deps and what have you that I don't need anymore
- Add git submodule for example project

## Plan for wiki

I'm probably gonna go ahead and get started on the wiki, so I can publish this and then add methods with new releases

That way, I can test it downstream more easily, and make sure the flow of everything works.

But I should test it first regardless, just before the first publish that is.
Should also implement `match` and `deep-equal` at least first, since that was one of the main driving points for me.

- Quick start guide
- FAQ
- Migration from TestEZ
- Server side usage (how you can use it, and propogating the error message is fine. but otherwise youll need to translate it)
- How to create your own extensions
- How to publish your own extensions
- How to use someone else's extensions
- API page (obviously)

## Features

features to highlight

- no test dependencies
- easy extensability for methods, noops, negations, and even custom properties
- descriptive error messages
  - should highlight common use examples
- more inclusive support for common methods

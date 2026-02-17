# Functional terms
Interaction: Anything that the user may use to interact with the system. 

Sequence: A ordered collection of interactions that, when entered in-order, trigger an action.
Combination: A unordered collection of interactions that, when entered at once, trigger an action.

# Implementation terms
Handler: A defined scope for handling bindings.
Binding: A defined binding between a collection of inputs and an action.

TODO:
- Make keys work
- Make mouse work
- Make scoped as far that's possible
- Allow access to produced events in scope

# Bla bla
We need something to determine an input makes sense in the current sequence we're walking, otherwise we should throw 
away our buildup. We need:

"KeyA" -> "KeyQ" -> "Shift": Action A
       -> "Ctrl" -> "Enter": Action B
"KeyQ"                     : Action C
"KeyQ" -> "Ctrl"           : Action D

The most simple implementation would be a tree of maps, where O(1) lookup is possible. We could use one map and make
sequences unique by adding in the sequence index of said input. Then in the end a value is not 

// 1. "KeyA" -> "i0kKeyA" -> Set.exists("i0kKeyA") -> true
// 1.1
// 2. "KeyQ" -> "i1kKeyQ" -> Set.exists("i1kKeyQ") -> true

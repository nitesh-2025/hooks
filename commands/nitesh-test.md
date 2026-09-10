---
description: Nitesh ka custom test runner - project ke tests dhoondo aur run karo
argument-hint: [optional file/folder path]
---

Is project ke test files dhoondo aur run karo.

Agar `$ARGUMENTS` diya gaya hai, to sirf usi file/folder ke tests run karo. Warna poore project ke tests dhoondo aur run karo.

Agar `$ARGUMENTS` project alias hai (pos, ko, nest, rlm, rlm-admin, b2b), to us project ke folder me tests run karo (paths `projects` skill me hain).

Steps:
1. Project me test framework identify karo (jest, pytest, mocha, etc.)
2. Relevant test files dhoondo
3. Tests run karo
4. Agar koi test fail ho, to:
   - Us file ka naam aur exact error clearly batao
   - Root cause samjhao (agar clear ho)
5. Last me summary do: kitne tests pass hue, kitne fail, total time

Output clean aur easy-to-read format me do, technical jargon minimum rakho.

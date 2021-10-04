import os, sys
import win32print
import sys

print(sys.argv)
printer_name = win32print.GetDefaultPrinter ()

if sys.version_info >= (3,):
  raw_data = bytes (sys.argv[1], "utf-8")
else:
  raw_data = sys.argv[1]

hPrinter = win32print.OpenPrinter (printer_name)
try:
  hJob = win32print.StartDocPrinter (hPrinter, 1, (sys.argv[1], None, "RAW"))
  try:
    win32print.StartPagePrinter (hPrinter)
    win32print.WritePrinter (hPrinter, raw_data)
    win32print.EndPagePrinter (hPrinter)
    win32print.WritePrinter(hPrinter, b'\x1dV\x00')
  finally:
    win32print.EndDocPrinter (hPrinter)
finally:
  win32print.ClosePrinter (hPrinter)